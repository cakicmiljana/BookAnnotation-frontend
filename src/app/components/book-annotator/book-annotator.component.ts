import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.state';
import { selectAnnotations } from 'src/app/store/annotations/annotations.selector';
import { loadAnnotations } from 'src/app/store/annotations/annotations.actions';
import { selectUserId } from 'src/app/store/users/users.selector';
import { selectSelectedBook } from 'src/app/store/books/books.selector';

import { Annotation } from 'src/app/models/annotation';
import { Book } from 'src/app/models/book';
import { Note } from 'src/app/models/note';

import { BooksService } from 'src/app/services/books.service';
import { TextAnnotator } from 'src/app/helper classes/TextAnnotator';
import { AddAnnotationComponent } from '../add-annotation/add-annotation.component';
import { UpdateAnnotationComponent } from '../update-annotation/update-annotation.component';

@Component({
  selector: 'app-book-annotator',
  templateUrl: './book-annotator.component.html',
  styleUrls: ['./book-annotator.component.css'],
  standalone: false
})
export class BookAnnotatorComponent implements OnInit {
  book: Book | null = null;
  allAnnotations: Annotation[] = [];

  note: Note | undefined;
  noteContent = '';

  userId = 0;

  currentPage = 0;
  pageSize = 3000;
  totalPages = 0;

  pageText = '';
  fullContent = '';
  annotatedText: SafeHtml = '';
  annotator: TextAnnotator | null = null;

  selectedText = '';
  dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private sanitizer: DomSanitizer, private service: BooksService) {}

  ngOnInit(): void {
    // Subscribe to user and selected book from state
    this.store.select(selectUserId).pipe(take(1)).subscribe(userId => {
      if (!userId) return;
      this.userId = userId;

      this.store.select(selectSelectedBook).subscribe(book => {
        if (!book) return;
        this.book = book;

        this.fullContent = book.content ?? '';
        this.pageSize = book.pageSize ?? 3000;
        this.totalPages = Math.ceil(this.fullContent.length / this.pageSize);

        // Dispatch to load annotations now that we have bookId and userId
        this.store.dispatch(loadAnnotations({ bookId: book.id, userId: this.userId }));

        this.setPageText();

        // Load note for user/book
        this.service.getNote(book.id, this.userId).subscribe(note => {
          this.note = note;
          this.noteContent = note?.content ?? '';
        });
      });

      // Subscribe to annotations
      this.store.select(selectAnnotations).subscribe(annotations => {
        this.allAnnotations = annotations.filter(a => a.userId === this.userId);
        if (this.fullContent) this.setPageText();
      });
    });
  }

  setPageText() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pageText = this.fullContent.substring(start, end);

    if (!this.annotator) this.annotator = new TextAnnotator();

    const rawAnnotated = this.annotator.annotateText(this.pageText, this.allAnnotations, this.currentPage, this.pageSize);
    this.annotatedText = this.sanitizer.bypassSecurityTrustHtml(rawAnnotated);
  }

  getPageData(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize ?? this.pageSize;
    this.totalPages = Math.ceil(this.fullContent.length / this.pageSize);
    this.setPageText();
  }

  annotateText(event: MouseEvent) {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    this.selectedText = selection.toString();
    const range = selection.getRangeAt(0);
    const textContainer = event.currentTarget as HTMLElement;

    const startOffset = this.annotator?.getOffset(textContainer, range.startContainer, range.startOffset);
    const endOffset = this.annotator?.getOffset(textContainer, range.endContainer, range.endOffset);

    if (startOffset !== undefined && endOffset !== undefined) {
      this.annotationDialog(this.selectedText, startOffset + this.currentPage * this.pageSize, endOffset + this.currentPage * this.pageSize);
    }
  }

  annotationDialog(text: string, start: number, end: number) {
    const dialogRef = this.dialog.open(AddAnnotationComponent, { data: { userId: this.userId, bookId: this.book!.id, text, start, end } });
    dialogRef.componentInstance.annotationAdded.subscribe(() => {
      this.store.dispatch(loadAnnotations({ bookId: this.book!.id, userId: this.userId }));
      dialogRef.close();
    });
  }

  updateAnnotation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('annotation')) return;

    this.dialog.open(UpdateAnnotationComponent, {
      data: {
        id: target.getAttribute('data-id'),
        start: target.getAttribute('data-start'),
        end: target.getAttribute('data-end'),
        comment: target.getAttribute('data-comment'),
        tag: target.getAttribute('data-tag'),
        color: target.getAttribute('data-color')
      }
    });
  }

  saveNote() {
    if (!this.book) return;
    if (this.note) this.service.updateNote(this.note.id, this.noteContent).subscribe();
    else this.service.addNote(this.book.id, this.userId, this.noteContent).subscribe();
  }
}