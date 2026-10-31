import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { VersionUploadComponent } from '../version-upload/version-upload.component';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-book-viewer',
    templateUrl: './book-viewer.component.html',
    styleUrls: ['./book-viewer.component.css'],
    standalone: false
})
export class BookViewerComponent {
    tab = 'about';
    loadError = false;
    @Input()
    book: Book | null = null;
    versions: Book[] | null = null;
    routerId: string | null = "";
    bookId: number | null = null;
    dialog = inject(MatDialog);
    constructor(private booksService: BooksService, private versionsService: BooksService, private route: ActivatedRoute, public ui: PresentationService) {
    }
    ngOnInit(): void {
        this.routerId = this.route.snapshot.paramMap.get("id");
        if (this.routerId) {
            this.bookId = Number(this.routerId.replace(/^:/, ''));
        }
        if (this.bookId) {
            this.booksService.getBookById(this.bookId)
                .subscribe({ next: b => { this.book = b ?? null; this.loadError = !b; }, error: () => this.loadError = true });
            this.versionsService.getAllBooks()
                .subscribe(v => this.versions = v.filter(edition => edition.id === this.bookId));
        }
    }
    openVersionUploadDialog() {
        const dialogRef = this.dialog.open(VersionUploadComponent, {
            width: '560px',
            data: { ...this.book, preview: true }
        });
        dialogRef.componentInstance.versionUploaded.subscribe(() => {
            if (this.bookId)
                this.versionsService.getAllBooks()
                    .subscribe(v => this.versions = v);
            dialogRef.close();
        });
    }
}
