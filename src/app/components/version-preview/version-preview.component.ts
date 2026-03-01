import { Component, Input } from '@angular/core';
import { BookDetails } from 'src/app/models/bookdetails';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
    selector: 'app-version-preview',
    templateUrl: './version-preview.component.html',
    styleUrls: ['./version-preview.component.css'],
    standalone: false
})
export class VersionPreviewComponent {
  @Input() version: BookDetails | null = null;

  constructor(private service: VersionsService) {

  }
}
