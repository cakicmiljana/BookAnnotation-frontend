import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book';
import { Note } from '../../models/note';
import { NotebookAnnotation } from '../../models/annotation';
import { BooksService } from '../../services/books.service';
import { PresentationService } from '../../ui/presentation.service';
interface NotebookEntry {
    book: Book;
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
    constructor(private books: BooksService, public ui: PresentationService) { }
    ngOnInit(): void {
        forkJoin({
            books: this.books.getAllBooks(),
            notes: this.books.getMyNotes(),
            annotations: this.books.getMyAnnotations()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: result => {
                this.entries = this.buildEntries(result.books, result.notes, result.annotations);
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }
    private buildEntries(books: Book[], notes: Note[], annotations: NotebookAnnotation[]): NotebookEntry[] {
        const entries: NotebookEntry[] = [];
        for (const book of books) {
            const note = notes.find(item => item.editionId === book.id);
            const bookAnnotations = annotations.filter(item => item.editionId === book.id);
            entries.push({
                book: book,
                content: note ? note.content : '',
                annotations: bookAnnotations
            });
        }
        return entries;
    }
    get visibleEntries(): NotebookEntry[] { return this.entries.filter(entry => (entry.book.title + ' ' + entry.book.author + ' ' + entry.content).toLowerCase().includes(this.query.toLowerCase())); }
    get noteCount(): number { return this.entries.filter(entry => entry.content).length; }
    get annotationCount(): number { return this.entries.reduce((count, entry) => count + entry.annotations.length, 0); }
}
