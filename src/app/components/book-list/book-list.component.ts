import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { AppState } from 'src/app/store/app.state';
import { loadBooks } from 'src/app/store/books/books.action';
import { selectBooks } from 'src/app/store/books/books.selector';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: false
})
export class BookListComponent {
  // @Input()
  books$ = this.store.select(selectBooks);

  ngOnInit() {
    this.store.dispatch(loadBooks());
  }

  constructor(private store: Store<AppState>) {

  }

}
