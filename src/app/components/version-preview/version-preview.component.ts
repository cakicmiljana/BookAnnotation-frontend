import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
    selector: 'app-version-preview',
    templateUrl: './version-preview.component.html',
    styleUrls: ['./version-preview.component.css'],
    standalone: false
})
export class VersionPreviewComponent {
  @Input() version: Book | null = null;

  constructor(private service: BooksService) {

  }
}
