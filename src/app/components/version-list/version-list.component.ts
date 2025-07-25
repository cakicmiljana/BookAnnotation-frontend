import { Component, Input } from '@angular/core';
import { Version } from 'src/app/models/version';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css'],
  standalone: false
})
export class VersionListComponent {
  // @Input() 
  versions : Version[] | null = null;

  constructor(private service: VersionsService) {

  }

  ngOnInit() : void {
    this.service.getAllVersions()
      .subscribe(allVersions => this.versions = allVersions);
  }
}
