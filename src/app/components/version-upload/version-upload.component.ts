import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VersionsService } from 'src/app/services/versions.service';

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

  constructor(private service: VersionsService) {

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
    if(this.file)
      this.service.uploadVersionPDF(this.file, 1, 3, this.language).subscribe();
  }
}
