import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css'],
  standalone: false
})
export class VersionListComponent {
  // @Input() 
  versions : Book[] | null = null;

  constructor(private service: BooksService) {

  }

  ngOnInit() : void {
    this.service.getAllBooks()
      .subscribe(allVersions => this.versions = allVersions);
  }
}
