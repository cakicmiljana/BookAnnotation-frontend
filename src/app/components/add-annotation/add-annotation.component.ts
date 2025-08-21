import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-add-annotation',
  templateUrl: './add-annotation.component.html',
  styleUrls: ['./add-annotation.component.css']
})
export class AddAnnotationComponent {
  data = inject(MAT_DIALOG_DATA);

  comment: string = "";
  tag: string = "";
  color: string = "lightblue";

  constructor(private service: VersionsService) {

  }

  addAnnotation() {
    this.service.addAnnotation(this.data.versionId, this.data.userId, this.data.start, this.data.end, this.comment, this.tag, this.color)
        .subscribe();
  }
}
