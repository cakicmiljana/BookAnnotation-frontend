import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/services/books.service';

@Component({
    selector: 'app-add-annotation',
    templateUrl: './add-annotation.component.html',
    styleUrls: ['./add-annotation.component.css'],
    standalone: false
})
export class AddAnnotationComponent {
  @Output() annotationAdded = new EventEmitter<void>();
  
  data = inject(MAT_DIALOG_DATA);

  comment: string = "";
  tag: string = "";
  color: string = "lightblue";

  constructor(private dialogRef: MatDialogRef<AddAnnotationComponent>, private service: BooksService, private snackBar: MatSnackBar) {

  }

  addAnnotation() {
    const annotation = {
      startOffset: this.data.start,
      endOffset: this.data.end,
      comment: this.comment,
      tag: this.tag || null,
      color: this.color
    };
    this.service.addAnnotation(this.data.editionId, annotation)
        .subscribe({
          next: (res) => {
            this.snackBar.open('You successfully annotated this book ✅', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });

            this.annotationAdded.emit();
          },
          error: (err) => {
            this.snackBar.open('Annotation failed ❌', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            console.error(err);
          }
        });
  }

  onSubmit() {
    this.dialogRef.close();
  }
}
