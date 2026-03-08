import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { AppState } from 'src/app/store/app.state';
import { loadBook } from 'src/app/store/books/books.action';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css'],
  standalone: false
})
export class BookPreviewComponent {
  @Input() book: Book | null | undefined = null;

  constructor(private store: Store<AppState>) {

  }

  selectBook(id: number) {
    this.store.dispatch(loadBook({ id }));
  }
}
