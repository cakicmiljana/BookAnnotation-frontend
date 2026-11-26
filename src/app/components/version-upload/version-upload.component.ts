import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Edition } from 'src/app/models/edition';
import { EditionsService } from 'src/app/services/editions.service';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

@Component({
    selector: 'app-version-upload',
    templateUrl: './version-upload.component.html',
    styleUrls: ['./version-upload.component.css'],
    standalone: false
})
export class VersionUploadComponent {
    @Output()
    versionUploaded = new EventEmitter<Edition>();
    data = inject(MAT_DIALOG_DATA);
    workId: number | null = null;
    title: string = "";
    author: string = "";
    language: string = "";
    isbn: string = "";
    fileName: string = "";
    file: File | null = null;
    fileError = '';
    uploading = false;
    errorMessage = '';
    constructor(private service: EditionsService, private snackBar: MatSnackBar) {
    }
    ngOnInit() {
        this.workId = this.data?.workId ?? null;
        this.title = this.data?.title || '';
        this.author = this.data?.author || '';
        this.language = this.data?.language || 'English';
    }
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.chooseFile(input.files[0]);
        }
    }
    onDrop(event: DragEvent): void {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        if (file) {
            this.chooseFile(file);
        }
    }
    chooseFile(file: File): void {
        this.file = file;
        this.fileName = file.name;
        this.errorMessage = '';
        if (!/\.(pdf|txt)$/i.test(file.name)) {
            this.fileError = 'Choose a PDF or plain text file.';
        }
        else if (file.size > MAX_FILE_SIZE) {
            this.fileError = 'The file is larger than 10 MB.';
        }
        else {
            this.fileError = '';
        }
    }
    uploadVersion() {
        if (!this.file)
            return;
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('language', this.language.trim());
        if (this.workId) {
            formData.append('workId', String(this.workId));
        }
        else {
            formData.append('title', this.title.trim());
            formData.append('author', this.author.trim());
        }
        if (this.isbn.trim()) {
            formData.append('isbn', this.isbn.trim());
        }

        this.uploading = true;
        this.errorMessage = '';
        this.service.uploadEdition(formData).subscribe({
            next: (edition) => {
                this.uploading = false;
                this.snackBar.open('You successfully uploaded a new edition ✅', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                });
                this.versionUploaded.emit(edition);
            },
            error: (err: HttpErrorResponse) => {
                this.uploading = false;
                this.errorMessage = this.readError(err);
            }
        });
    }
    private readError(err: HttpErrorResponse): string {
        if (err.status === 413) {
            return 'The file is larger than 10 MB.';
        }
        const message = err.error?.message;
        if (Array.isArray(message)) {
            return message.join(', ');
        }
        if (message) {
            return message;
        }
        return 'Upload failed. Please try again.';
    }
}
