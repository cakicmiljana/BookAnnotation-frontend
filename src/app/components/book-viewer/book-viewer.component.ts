import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Version } from 'src/app/models/version';
import { BooksService } from 'src/app/services/books.service';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.css'],
  standalone: false
})
export class BookViewerComponent {
  @Input() book: Book | null = null;
  routerId: string | null = "";
  bookId: number | null = null;

  constructor(private service: BooksService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get("id");
    if (this.routerId && this.routerId.startsWith(":")) {
      this.bookId = Number(this.routerId.slice(1));
    }

    if(this.bookId)
      this.service.getBookById(this.bookId)
        .subscribe(v => this.book=v)
  }
}
