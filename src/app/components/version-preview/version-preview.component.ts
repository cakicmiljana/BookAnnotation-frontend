import { Component, Input } from '@angular/core';
import { Version } from 'src/app/models/version';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-version-preview',
  templateUrl: './version-preview.component.html',
  styleUrls: ['./version-preview.component.css']
})
export class VersionPreviewComponent {
  @Input() version: Version | null = null;

  constructor(private service: VersionsService) {

  }
}
