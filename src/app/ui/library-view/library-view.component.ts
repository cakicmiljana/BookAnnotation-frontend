import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { PresentationService } from '../presentation.service';
import { VersionUploadComponent } from '../../components/version-upload/version-upload.component';
@Component({
    selector: 'app-library-view', standalone: false,
    templateUrl: './library-view.component.html', styleUrls: ['./library-view.component.css', './library-responsive.css']
})
export class LibraryViewComponent {
    @Input()
    books: Book[] | null = [];
    @Input()
    personal = false;
    query = '';
    sort = 'title';
    view = 'grid';
    constructor(public ui: PresentationService, private dialog: MatDialog, private router: Router) { }
    get visibleBooks(): Book[] {
        const query = this.query.toLocaleLowerCase().trim();
        return [...(this.books || [])].filter(book => (book.title + ' ' + book.author).toLocaleLowerCase().includes(query))
            .sort((a, b) => this.sort === 'author' ? a.author.localeCompare(b.author) : this.sort === 'year' ? a.publicationYear - b.publicationYear : a.title.localeCompare(b.title));
    }
    upload(): void {
        const dialogRef = this.dialog.open(VersionUploadComponent, { width: '560px', data: { title: '', author: '', language: 'English' } });
        dialogRef.componentInstance.versionUploaded.subscribe(edition => {
            dialogRef.close();
            this.router.navigate(this.ui.link('book', edition.id));
        });
    }
}
