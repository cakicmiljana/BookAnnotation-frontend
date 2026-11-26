import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VersionUploadComponent } from '../version-upload/version-upload.component';
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
    constructor(private booksService: BooksService, private versionsService: BooksService, private route: ActivatedRoute, public ui: PresentationService, private snackBar: MatSnackBar) {
    }
    ngOnInit(): void {
        const workId = this.route.snapshot.paramMap.get("workId");
        if (workId) {
            this.loadWork(Number(workId));
            return;
        }
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
    private loadWork(workId: number): void {
        this.booksService.getEditionsOfWork(workId).subscribe({
            next: editions => {
                if (editions.length === 0) {
                    this.loadError = true;
                    return;
                }
                let firstEdition = editions[0];
                for (const edition of editions) {
                    if (edition.language === edition.originalLanguage) {
                        firstEdition = edition;
                        break;
                    }
                }
                this.versions = editions;
                this.book = firstEdition;
                this.bookId = firstEdition.id;
                this.checkLibrary(firstEdition.id);
            },
            error: () => this.loadError = true
        });
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
            this.booksService.removeFromLibrary(this.book.id).subscribe({
                next: () => this.inLibrary = false,
                error: () => this.snackBar.open('Could not remove the book from your library.', 'Close', { duration: 3000 })
            });
        }
        else {
            this.booksService.addToLibrary(this.book.id).subscribe({
                next: () => this.inLibrary = true,
                error: () => this.snackBar.open('Could not add the book to your library.', 'Close', { duration: 3000 })
            });
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
            data: { ...this.book }
        });
        dialogRef.componentInstance.versionUploaded.subscribe(() => {
            this.loadEditions();
            dialogRef.close();
        });
    }
}
