import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';

@Component({
    selector: 'app-update-annotation',
    templateUrl: './update-annotation.component.html',
    styleUrls: ['./update-annotation.component.css'],
    standalone: false
})
export class UpdateAnnotationComponent {
  data = inject(MAT_DIALOG_DATA);

  comment: string = "";
  tag: string = "";
  color: string = "lightblue";

  constructor(private service: BooksService) {
    this.comment = this.data.comment;
    this.tag = this.data.tag;
    this.color = this.data.color;
  }

  updateAnnotation() {
    this.service.updateAnnotation(this.data.id, this.data.start, this.data.end, this.comment, this.tag, this.color)
        .subscribe();
  }

  deleteAnnotation() {
    this.service.deleteAnnotation(this.data.id).subscribe();
  }
}
