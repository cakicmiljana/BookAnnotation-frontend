import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Edition } from '../../models/edition';
import { Note } from '../../models/note';
import { NotebookAnnotation } from '../../models/annotation';
import { EditionsService } from '../../services/editions.service';
import { PresentationService } from '../../ui/presentation.service';
interface NotebookEntry {
    edition: Edition;
    content: string;
    annotations: NotebookAnnotation[];
}
@Component({ selector: 'app-notes-overview', standalone: false, templateUrl: './notes-overview.component.html', styleUrls: ['./notes-overview.component.css'] })
export class NotesOverviewComponent implements OnInit {
    entries: NotebookEntry[] = [];
    query = '';
    tab = 'notes';
    loading = true;
    error = false;
    private destroyRef = inject(DestroyRef);
    constructor(private editionsService: EditionsService, public ui: PresentationService) { }
    ngOnInit(): void {
        forkJoin({
            editions: this.editionsService.getAllEditions(),
            notes: this.editionsService.getMyNotes(),
            annotations: this.editionsService.getMyAnnotations()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: result => {
                this.entries = this.buildEntries(result.editions, result.notes, result.annotations);
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
    private buildEntries(editions: Edition[], notes: Note[], annotations: NotebookAnnotation[]): NotebookEntry[] {
        const entries: NotebookEntry[] = [];
        for (const edition of editions) {
            const note = notes.find(item => item.editionId === edition.id);
            const editionAnnotations = annotations.filter(item => item.editionId === edition.id);
            entries.push({
                edition: edition,
                content: note ? note.content : '',
                annotations: editionAnnotations
            });
        }
        return entries;
    }
    get visibleEntries(): NotebookEntry[] { return this.entries.filter(entry => (entry.edition.work.title + ' ' + entry.edition.work.author + ' ' + entry.content).toLowerCase().includes(this.query.toLowerCase())); }
    get noteCount(): number { return this.entries.filter(entry => entry.content).length; }
    get annotationCount(): number { return this.entries.reduce((count, entry) => count + entry.annotations.length, 0); }
}
