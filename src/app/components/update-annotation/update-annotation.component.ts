import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VersionsService } from 'src/app/services/versions.service';

@Component({
  selector: 'app-update-annotation',
  templateUrl: './update-annotation.component.html',
  styleUrls: ['./update-annotation.component.css']
})
export class UpdateAnnotationComponent {
  data = inject(MAT_DIALOG_DATA);

  comment: string = "";
  tag: string = "";
  color: string = "lightblue";

  constructor(private service: VersionsService) {
    this.comment = this.data.comment;
    this.tag = this.data.tag;
    this.color = this.data.color;
  }

  updateAnnotation() {
    this.service.updateAnnotation(this.data.id, this.data.start, this.data.end, this.comment, this.tag, this.color)
        .subscribe();
  }
}
