import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VersionsService } from 'src/app/services/versions.service';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
  selector: 'app-version-upload',
  templateUrl: './version-upload.component.html',
  styleUrls: ['./version-upload.component.css']
})
export class VersionUploadComponent {
  @Output() versionUploaded = new EventEmitter<void>();

  data = inject(MAT_DIALOG_DATA);
  language: string = "";
  isbn: string = "";
  fileName: string = "";
  file: File | null = null;
  bookId: number = 0;

  constructor(private service: VersionsService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.language = this.data.originalLanguage
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
    }
  }

  uploadVersion() {
    if (!this.file) return;

    this.service.uploadVersionPDF(this.file, getUserId(), this.data.id, this.language)
      .subscribe({
        next: () => {
          this.snackBar.open('You successfully uploaded a new version ✅', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          this.versionUploaded.emit();
        },
        error: (err) => {
          this.snackBar.open('Version upload failed ❌', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          console.error(err);
        }
      });
  }
}
