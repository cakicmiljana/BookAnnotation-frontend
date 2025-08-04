import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-version-upload',
  templateUrl: './version-upload.component.html',
  styleUrls: ['./version-upload.component.css']
})
export class VersionUploadComponent {
  data = inject(MAT_DIALOG_DATA);
  language: string = "";
  isbn: string = "";
  fileName: string = "";
  file: File | null = null;

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

  }
}
