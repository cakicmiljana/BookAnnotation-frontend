import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Version } from 'src/app/models/version';
import { BooksService } from 'src/app/services/books.service';
import { VersionsService } from 'src/app/services/versions.service';
import { MatDialog } from '@angular/material/dialog';
import { VersionUploadComponent } from '../version-upload/version-upload.component';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.css'],
  standalone: false
})
export class BookViewerComponent {
  @Input() book: Book | null = null;
  versions: Version[] | null = null;
  routerId: string | null = "";
  bookId: number | null = null;

  dialog = inject(MatDialog);

  constructor(private booksService: BooksService, private versionsService: VersionsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get("id");
    if (this.routerId && this.routerId.startsWith(":")) {
      this.bookId = Number(this.routerId.slice(1));
    }

    if(this.bookId) {
      this.booksService.getBookById(this.bookId)
        .subscribe(b => this.book = b ?? null)

      this.versionsService.getVersionsByBookId(getUserId(), this.bookId)
        .subscribe(v => this.versions=v)
    }
  }

  openVersionUploadDialog() {
    const dialogRef = this.dialog.open(VersionUploadComponent, {
      data: this.book
    })

    dialogRef.componentInstance.versionUploaded.subscribe(() => {
      if(this.bookId)
        this.versionsService.getVersionsByBookId(getUserId(), this.bookId)
          .subscribe(v => this.versions=v)
        dialogRef.close();
    });
  }
}