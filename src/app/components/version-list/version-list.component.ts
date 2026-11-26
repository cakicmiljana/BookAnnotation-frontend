import { Component } from '@angular/core';
import { LibraryItem } from 'src/app/models/library-item';
import { EditionsService } from 'src/app/services/editions.service';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css'],
  standalone: false
})
export class VersionListComponent {
  versions: LibraryItem[] | null = null;

  constructor(private service: EditionsService) {

  }

  ngOnInit(): void {
    this.service.getLibrary().subscribe({
      next: library => this.versions = library,
      error: () => this.versions = []
    });
  }
}
