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
    this.service.addAnnotation(this.data.bookId, this.data.userId, this.data.start, this.data.end, this.comment, this.tag, this.color)
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
