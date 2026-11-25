import { Component } from '@angular/core';
import { LibraryItem } from 'src/app/models/library-item';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css'],
  standalone: false
})
export class VersionListComponent {
  versions: LibraryItem[] | null = null;

  constructor(private service: BooksService) {

  }

  ngOnInit(): void {
    this.service.getLibrary().subscribe({
      next: library => this.versions = library,
      error: () => this.versions = []
    });
  }
}
