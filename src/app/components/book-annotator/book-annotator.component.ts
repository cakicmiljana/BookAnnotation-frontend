import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Version } from 'src/app/models/version';
import { BooksService } from 'src/app/services/books.service';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-book-annotator',
  templateUrl: './book-annotator.component.html',
  styleUrls: ['./book-annotator.component.css']
})
export class BookAnnotatorComponent {
  @Input() version: Version | null = null;

  constructor(private booksService: BooksService, private versionsService: VersionsService, private route: ActivatedRoute) {

  }
}
