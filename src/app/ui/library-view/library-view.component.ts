import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Edition } from '../../models/edition';
import { Work } from '../../models/work';
import { PresentationService } from '../presentation.service';
import { VersionUploadComponent } from '../../components/version-upload/version-upload.component';
@Component({
    selector: 'app-library-view', standalone: false,
    templateUrl: './library-view.component.html', styleUrls: ['./library-view.component.css', './library-responsive.css']
})
export class LibraryViewComponent {
    @Input()
    editions: Edition[] | null = [];
    @Input()
    works: Work[] | null = [];
    @Input()
    personal = false;
    query = '';
    sort = 'title';
    view = 'grid';
    constructor(public ui: PresentationService, private dialog: MatDialog, private router: Router) { }
    get visibleEditions(): Edition[] {
        const query = this.query.toLocaleLowerCase().trim();
        return [...(this.editions || [])].filter(edition => (edition.work.title + ' ' + edition.work.author).toLocaleLowerCase().includes(query))
            .sort((a, b) => this.sort === 'author' ? a.work.author.localeCompare(b.work.author) : this.sort === 'year' ? (a.work.publicationYear ?? 0) - (b.work.publicationYear ?? 0) : a.work.title.localeCompare(b.work.title));
    }
    get visibleWorks(): Work[] {
        const query = this.query.toLocaleLowerCase().trim();
        return [...(this.works || [])].filter(work => (work.title + ' ' + work.author).toLocaleLowerCase().includes(query))
            .sort((a, b) => this.sort === 'author' ? a.author.localeCompare(b.author) : this.sort === 'year' ? (a.publicationYear ?? 0) - (b.publicationYear ?? 0) : a.title.localeCompare(b.title));
    }
    get totalCount(): number {
        if (this.personal) {
            return this.editions?.length || 0;
        }
        return this.works?.length || 0;
    }
    get visibleCount(): number {
        if (this.personal) {
            return this.visibleEditions.length;
        }
        return this.visibleWorks.length;
    }
    upload(): void {
        const dialogRef = this.dialog.open(VersionUploadComponent, { width: '560px', data: { title: '', author: '', language: 'English' } });
        dialogRef.componentInstance.versionUploaded.subscribe(edition => {
            dialogRef.close();
            this.router.navigate(this.ui.link('book', edition.id));
        });
    }
}
