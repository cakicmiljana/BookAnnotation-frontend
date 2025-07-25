import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css'],
  standalone: false
})
export class BookPreviewComponent {
  @Input() book: Book | null | undefined = null;

  constructor() {

  }
}
