import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin, of, switchMap, catchError, take, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book';
import { Annotation } from '../../models/annotation';
import { BooksService } from '../../services/books.service';
import { PresentationService } from '../../ui/presentation.service';
import { AppState } from '../../store/app.state';
import { selectUserId } from '../../store/users/users.selector';
interface NotebookEntry {
    book: Book;
    content: string;
    annotations: Annotation[];
}
@Component({ selector: 'app-notes-overview', standalone: false, templateUrl: './notes-overview.component.html', styleUrls: ['./notes-overview.component.css'] })
export class NotesOverviewComponent implements OnInit {
    entries: NotebookEntry[] = [];
    query = '';
    tab = 'notes';
    loading = true;
    error = false;
    private destroyRef = inject(DestroyRef);
    constructor(private books: BooksService, private store: Store<AppState>, public ui: PresentationService) { }
    ngOnInit(): void {
        this.store.select(selectUserId).pipe(take(1), switchMap(id => {
            const uid = this.ui.preview ? 1 : id || 0;
            return this.books.getAllBooks().pipe(switchMap(books => this.loadEntries(books, uid)));
        }), catchError(() => { this.error = true; return of([]); }), takeUntilDestroyed(this.destroyRef)).subscribe(entries => { this.entries = entries; this.loading = false; });
    }
    private loadEntries(books: Book[], userId: number): Observable<NotebookEntry[]> {
        if (!books.length) return of([]);
        return forkJoin(books.map(book => forkJoin({
            note: this.books.getNote(book.id, userId),
            annotations: this.books.getAnnotationsByBookId(book.id, userId)
        }).pipe(map(({ note, annotations }) => ({
            book,
            content: this.ui.getNoteDraft(book.id, userId) ?? note?.content ?? '',
            annotations
        })))));
    }
    get visibleEntries(): NotebookEntry[] { return this.entries.filter(entry => (entry.book.title + ' ' + entry.book.author + ' ' + entry.content).toLowerCase().includes(this.query.toLowerCase())); }
    get noteCount(): number { return this.entries.filter(entry => entry.content).length; }
    get annotationCount(): number { return this.entries.reduce((count, entry) => count + entry.annotations.length, 0); }
}
