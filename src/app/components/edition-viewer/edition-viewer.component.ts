import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edition } from 'src/app/models/edition';
import { EditionsService } from 'src/app/services/editions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VersionUploadComponent } from '../version-upload/version-upload.component';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-edition-viewer',
    templateUrl: './edition-viewer.component.html',
    styleUrls: ['./edition-viewer.component.css'],
    standalone: false
})
export class EditionViewerComponent {
    tab = 'about';
    loadError = false;
    @Input()
    edition: Edition | null = null;
    versions: Edition[] | null = null;
    routerId: string | null = "";
    editionId: number | null = null;
    inLibrary = false;
    dialog = inject(MatDialog);
    constructor(private editionsService: EditionsService, private versionsService: EditionsService, private route: ActivatedRoute, public ui: PresentationService, private snackBar: MatSnackBar) {
    }
    ngOnInit(): void {
        const workId = this.route.snapshot.paramMap.get("workId");
        if (workId) {
            this.loadWork(Number(workId));
            return;
        }
        this.routerId = this.route.snapshot.paramMap.get("id");
        if (this.routerId) {
            this.editionId = Number(this.routerId.replace(/^:/, ''));
        }
        if (this.editionId) {
            this.editionsService.getEditionById(this.editionId)
                .subscribe({ next: b => { this.edition = b; this.loadEditions(); }, error: () => this.loadError = true });
            this.checkLibrary(this.editionId);
        }
    }
    private loadWork(workId: number): void {
        this.editionsService.getEditionsOfWork(workId).subscribe({
            next: editions => {
                if (editions.length === 0) {
                    this.loadError = true;
                    return;
                }
                let firstEdition = editions[0];
                for (const edition of editions) {
                    if (edition.language === edition.work.originalLanguage) {
                        firstEdition = edition;
                        break;
                    }
                }
                this.versions = editions;
                this.edition = firstEdition;
                this.editionId = firstEdition.id;
                this.checkLibrary(firstEdition.id);
            },
            error: () => this.loadError = true
        });
    }
    private checkLibrary(editionId: number): void {
        this.editionsService.getLibrary().subscribe(library => {
            this.inLibrary = library.some(item => item.id === editionId);
        });
    }
    toggleLibrary(): void {
        if (!this.edition)
            return;
        if (this.inLibrary) {
            this.editionsService.removeFromLibrary(this.edition.id).subscribe({
                next: () => this.inLibrary = false,
                error: () => this.snackBar.open('Could not remove the book from your library.', 'Close', { duration: 3000 })
            });
        }
        else {
            this.editionsService.addToLibrary(this.edition.id).subscribe({
                next: () => this.inLibrary = true,
                error: () => this.snackBar.open('Could not add the book to your library.', 'Close', { duration: 3000 })
            });
        }
    }
    private loadEditions(): void {
        if (this.edition)
            this.versionsService.getEditionsOfWork(this.edition.workId)
                .subscribe(v => this.versions = v);
    }
    openVersionUploadDialog() {
        const dialogRef = this.dialog.open(VersionUploadComponent, {
            width: '560px',
            data: {
                workId: this.edition?.workId,
                title: this.edition?.work.title,
                author: this.edition?.work.author,
                language: this.edition?.language
            }
        });
        dialogRef.componentInstance.versionUploaded.subscribe(() => {
            this.loadEditions();
            dialogRef.close();
        });
    }
}
