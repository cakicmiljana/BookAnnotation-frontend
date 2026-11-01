import { afterNextRender, Component, DestroyRef, ElementRef, Injector, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, take } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectAnnotations } from '../../store/annotations/annotations.selector';
import { loadAnnotations } from '../../store/annotations/annotations.actions';
import { selectUserId } from '../../store/users/users.selector';
import { selectNoteByBookAndUser } from '../../store/notes/notes.selector';
import * as NotesActions from '../../store/notes/notes.actions';
import { Book } from '../../models/book';
import { Annotation } from '../../models/annotation';
import { Note } from '../../models/note';
import { BooksService } from '../../services/books.service';
import { PresentationService } from '../../ui/presentation.service';
import { TextAnnotator } from '../../helper classes/TextAnnotator';
import { ANNOTATION_COLORS } from '../../ui/annotation-fields.component';
import { TextMatch } from '../../ui/book-search/text-search';
interface ReadingSegment {
    text: string;
    annotation?: Annotation;
    match: boolean;
}
@Component({
    selector: 'app-book-annotator', templateUrl: './book-annotator.component.html',
    styleUrls: ['./book-annotator.component.css', './reader-surface.css', './reader-panels.css', './reader-annotations.css', './reader-appearance.css', './reader-responsive.css'], standalone: false
})
export class BookAnnotatorComponent implements OnInit {
    book: Book | null = null;
    allAnnotations: Annotation[] = [];
    note: Note | undefined;
    noteContent = '';
    noteStatus = 'Draft in this workspace';
    userId = 0;
    currentPage = 0;
    pageSize = 3000;
    totalPages = 0;
    pageText = '';
    fullContent = '';
    selectedText = '';
    selectedStart = 0;
    selectedEnd = 0;
    selectedAnnotation: Annotation | null = null;
    mode: 'read' | 'notes' = 'read';
    showSearch = false;
    panel: 'annotations' | 'notes' = 'annotations';
    showPanel = window.matchMedia('(min-width: 801px)').matches;
    showContents = false;
    showAppearance = false;
    focusMode = false;
    fontSize = 21;
    lineHeight = 1.85;
    readingWidth = 'comfortable';
    font = 'serif';
    theme = 'paper';
    showHighlights = true;
    bookmarked = false;
    tagFilter = '';
    editorOpen = false;
    draftColor = 'lightyellow';
    draftTag = '';
    draftComment = '';
    confirmDelete = false;
    loadError = false;
    loading = true;
    selectionReady = false;
    activeMatch: TextMatch | null = null;
    @ViewChild('readerContent') readerContent?: ElementRef<HTMLElement>;
    @ViewChild('searchToggle') searchToggle?: ElementRef<HTMLButtonElement>;
    colors = ANNOTATION_COLORS;
    private annotator = new TextAnnotator();
    private destroyRef = inject(DestroyRef);
    private injector = inject(Injector);
    constructor(private store: Store<AppState>, private booksService: BooksService, private route: ActivatedRoute, public ui: PresentationService) { }
    ngOnInit(): void {
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const mode = params.get('mode');
            const panel = params.get('panel');
            this.mode = mode === 'notes' ? 'notes' : 'read';
            this.showSearch = mode === 'search';
            if (panel === 'notes') {
                this.panel = panel;
                this.showPanel = true;
            }
        });
        this.store.select(selectUserId).pipe(take(1)).subscribe(id => this.userId = this.ui.preview ? 1 : (id || 0));
        this.route.paramMap.pipe(switchMap(params => { this.loading = true; return this.booksService.getBookById(Number((params.get('id') || '').replace(/^:/, ''))).pipe(catchError(() => of(null))); }), takeUntilDestroyed(this.destroyRef)).subscribe(book => {
            this.loading = false;
            this.loadError = !book;
            this.book = book || null;
            this.allAnnotations = [];
            this.noteContent = '';
            this.note = undefined;
            this.currentPage = 0;
            this.editorOpen = false;
            this.activeMatch = null;
            this.selectionReady = false;
            this.selectedText = '';
            if (!book)
                return;
            this.fullContent = book.content || '';
            this.pageSize = book.pageSize || 3000;
            this.totalPages = Math.max(1, Math.ceil(this.fullContent.length / this.pageSize));
            this.setPageText();
            if (this.ui.preview) {
                this.booksService.getAnnotationsByBookId(book.id, 1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(items => this.allAnnotations = items.map(item => ({ ...item })));
                this.booksService.getNote(book.id, 1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(note => { this.note = note; this.noteContent = this.ui.getNoteDraft(book.id, 1) ?? note?.content ?? ''; });
            }
            else {
                this.store.dispatch(loadAnnotations({ bookId: book.id, userId: this.userId }));
                this.store.dispatch(NotesActions.getNote({ bookId: book.id, userId: this.userId }));
            }
        });
        this.store.select(selectAnnotations).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(items => {
            if (!this.ui.preview)
                this.allAnnotations = items.filter(item => item.userId === this.userId && item.bookId === this.book?.id).map(item => ({ ...item }));
        });
        this.store.select(state => state.notes).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (!this.ui.preview && this.book)
                this.store.select(selectNoteByBookAndUser(this.book.id, this.userId)).pipe(take(1)).subscribe(note => { this.note = note; this.noteContent = this.ui.getNoteDraft(this.book!.id, this.userId) ?? note?.content ?? ''; });
        });
    }
    setPageText(): void { this.pageText = this.fullContent.substring(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize); }
    getPageData(event: {
        pageIndex: number;
        pageSize?: number;
    }): void {
        this.pageSize = event.pageSize ?? this.pageSize;
        this.totalPages = Math.max(1, Math.ceil(this.fullContent.length / this.pageSize));
        this.currentPage = Math.max(0, Math.min(this.totalPages - 1, event.pageIndex));
        this.setPageText();
        this.selectionReady = false;
    }
    get locations(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i); }
    trackSegment(index: number): number { return index; }
    get filteredAnnotations(): Annotation[] { return this.allAnnotations.filter(item => !this.tagFilter || item.tag === this.tagFilter); }
    get segments(): ReadingSegment[] {
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageText.length;
        const annotations = this.allAnnotations.filter(item => item.startOffset < end && item.endOffset > start);
        const boundaries = new Set<number>([start, end]);
        annotations.forEach(item => { boundaries.add(Math.max(start, item.startOffset)); boundaries.add(Math.min(end, item.endOffset)); });
        if (this.activeMatch) {
            boundaries.add(Math.max(start, Math.min(end, this.activeMatch.offset)));
            boundaries.add(Math.max(start, Math.min(end, this.activeMatch.offset + this.activeMatch.length)));
        }
        const points = [...boundaries].sort((a, b) => a - b);
        return points.slice(0, -1).map((point, i) => ({
            text: this.fullContent.slice(point, points[i + 1]),
            annotation: annotations.find(item => item.startOffset <= point && item.endOffset > point),
            match: !!this.activeMatch && point >= this.activeMatch.offset && point < this.activeMatch.offset + this.activeMatch.length
        }));
    }
    displayColor(color: string): string { return this.colors.find(item => item.value === color)?.swatch || (color === 'lightcoral' ? '#f2dcdc' : color); }
    excerpt(annotation: Annotation): string { return this.fullContent.slice(annotation.startOffset, annotation.endOffset); }
    annotateText(event: Event): void {
        const selection = window.getSelection();
        const container = event.currentTarget as HTMLElement;
        if (!selection || selection.isCollapsed || !selection.rangeCount)
            return;
        const range = selection.getRangeAt(0);
        if (!container.contains(range.startContainer) || !container.contains(range.endContainer))
            return;
        this.selectedText = selection.toString();
        this.selectedStart = this.annotator.getOffset(container, range.startContainer, range.startOffset) + this.currentPage * this.pageSize;
        this.selectedEnd = this.annotator.getOffset(container, range.endContainer, range.endOffset) + this.currentPage * this.pageSize;
        this.selectionReady = !!this.selectedText.trim();
    }
    annotationDialog(text: string, start: number, end: number): void {
        this.selectedText = text;
        this.selectedStart = start;
        this.selectedEnd = end;
        this.selectedAnnotation = null;
        this.draftComment = '';
        this.draftTag = '';
        this.draftColor = 'lightyellow';
        this.editorOpen = true;
        this.panel = 'annotations';
        this.showPanel = true;
        this.selectionReady = false;
    }
    edit(annotation: Annotation): void {
        this.selectedAnnotation = annotation;
        this.selectedText = this.excerpt(annotation);
        this.selectedStart = annotation.startOffset;
        this.selectedEnd = annotation.endOffset;
        this.draftComment = annotation.comment;
        this.draftTag = annotation.tag;
        this.draftColor = annotation.color;
        this.editorOpen = true;
        this.confirmDelete = false;
        this.panel = 'annotations';
        this.showPanel = true;
        this.getPageData({ pageIndex: Math.floor(annotation.startOffset / this.pageSize) });
    }
    updateAnnotation(annotation: Annotation | undefined): void { if (annotation && window.getSelection()?.isCollapsed !== false)
        this.edit(annotation); }
    saveAnnotation(): void {
        if (!this.book)
            return;
        const item: Annotation = {
            id: this.selectedAnnotation?.id ?? -Date.now(), bookId: this.book.id, userId: this.userId,
            startOffset: this.selectedStart, endOffset: this.selectedEnd, comment: this.draftComment, tag: this.draftTag, color: this.draftColor,
            createdAt: this.selectedAnnotation?.createdAt ?? new Date(), deletedAt: null
        };
        this.allAnnotations = this.selectedAnnotation ? this.allAnnotations.map(annotation => annotation.id === item.id ? item : annotation) : [...this.allAnnotations, item];
        this.editorOpen = false;
        this.selectionReady = false;
    }
    deleteAnnotation(): void { this.allAnnotations = this.allAnnotations.filter(item => item.id !== this.selectedAnnotation?.id); this.editorOpen = false; this.confirmDelete = false; }
    saveNote(): void { if (this.book)
        this.ui.keepNoteDraft(this.book.id, this.userId, this.noteContent); this.noteStatus = 'Draft kept for this visit'; }
    toggleSearch(): void {
        if (this.showSearch && this.mode === 'read') { this.closeSearch(); return; }
        this.mode = 'read';
        this.showSearch = true;
    }
    closeSearch(): void {
        this.showSearch = false;
        this.activeMatch = null;
        this.searchToggle?.nativeElement.focus();
    }
    goToMatch(match: TextMatch | null): void {
        this.activeMatch = match;
        if (!match) return;
        this.getPageData({ pageIndex: Math.floor(match.offset / this.pageSize) });
        afterNextRender(() => {
            this.readerContent?.nativeElement.querySelector('.search-match')?.scrollIntoView({ block: 'center', behavior: 'auto' });
        }, { injector: this.injector });
    }
    resetAppearance(): void { this.fontSize = 21; this.lineHeight = 1.85; this.readingWidth = 'comfortable'; this.font = 'serif'; this.theme = 'paper'; this.showHighlights = true; this.focusMode = false; }
}
