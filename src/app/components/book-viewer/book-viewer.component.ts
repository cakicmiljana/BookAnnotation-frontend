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
    inLibrary = false;
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
                .subscribe({ next: b => { this.book = b; this.loadEditions(); }, error: () => this.loadError = true });
            this.checkLibrary(this.bookId);
        }
    }
    private checkLibrary(bookId: number): void {
        this.booksService.getLibrary().subscribe(library => {
            this.inLibrary = library.some(item => item.id === bookId);
        });
    }
    toggleLibrary(): void {
        if (!this.book)
            return;
        if (this.inLibrary) {
            this.booksService.removeFromLibrary(this.book.id).subscribe(() => this.inLibrary = false);
        }
        else {
            this.booksService.addToLibrary(this.book.id).subscribe(() => this.inLibrary = true);
        }
    }
    private loadEditions(): void {
        if (this.book)
            this.versionsService.getEditionsOfWork(this.book.workId)
                .subscribe(v => this.versions = v);
    }
    openVersionUploadDialog() {
        const dialogRef = this.dialog.open(VersionUploadComponent, {
            width: '560px',
            data: { ...this.book, preview: true }
        });
        dialogRef.componentInstance.versionUploaded.subscribe(() => {
            this.loadEditions();
            dialogRef.close();
        });
    }
}
