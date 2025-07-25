import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Version } from 'src/app/models/version';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.css'],
  standalone: false
})
export class BookViewerComponent {
  @Input() version: Version | null = null;

  constructor() {

  }
}
