import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: false
})
export class BookListComponent {
  // @Input() 
  books: Book[] | null = null;

  constructor(private service: BooksService) {

  }

  ngOnInit() : void {
    this.service.getAllBooks()
      .subscribe(allBooks => this.books = allBooks)
  }
}
