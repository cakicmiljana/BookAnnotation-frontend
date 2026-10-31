import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { AppState } from 'src/app/store/app.state';
import { loadBook } from 'src/app/store/books/books.action';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-book-preview',
    templateUrl: './book-preview.component.html',
    styleUrls: ['./book-preview.component.css'],
    standalone: false
})
export class BookPreviewComponent {
    @Input()
    book: Book | null | undefined = null;
    @Input()
    compact = false;
    constructor(private store: Store<AppState>, public ui: PresentationService) {
    }
    selectBook(id: number) {
        this.store.dispatch(loadBook({ id }));
    }
}
