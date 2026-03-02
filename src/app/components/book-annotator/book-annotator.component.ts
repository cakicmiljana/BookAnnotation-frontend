import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Annotation } from 'src/app/models/annotation';

import { BooksService } from 'src/app/services/books.service';
import { TextAnnotator } from 'src/app/helper classes/TextAnnotator';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnotationComponent } from '../add-annotation/add-annotation.component';
import { UpdateAnnotationComponent } from '../update-annotation/update-annotation.component';
import { Note } from 'src/app/models/note';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';
import { Book } from 'src/app/models/book';

@Component({
    selector: 'app-book-annotator',
    templateUrl: './book-annotator.component.html',
    styleUrls: ['./book-annotator.component.css'],
    standalone: false
})
export class BookAnnotatorComponent {
  @Input() book: Book | null = null;

  showNote: boolean = false;
  note: Note | undefined = undefined;
  noteContent: string = "";

  get userId(): number {
    return getUserId();
  }

  routerId: string | null = '';
  bookId: number = 0;

  currentPage = 0;
  pageSize = 3000;
  totalPages = 0;

  pageText = '';
  annotatedText: SafeHtml = '';
  fullContent: string = '';

  annotator: TextAnnotator | null = null;
  allAnnotations: Annotation[] = [];

  // new annotation
  selectedText: string = "";

  dialog = inject(MatDialog);

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: BooksService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get('id');
    if (this.routerId && this.routerId.startsWith(':')) {
      this.bookId = Number(this.routerId.slice(1));
    }

    if (!this.bookId) return;

    forkJoin({
      book: this.service.getBookById(this.bookId),
      annotations: this.service.getAnnotationsByBookId(this.bookId)
    }).subscribe(({ book, annotations }) => {
      this.book = book ?? null;
      this.allAnnotations = annotations ?? [];
      this.fullContent = this.book?.content ?? '';
      this.pageSize = this.book?.pageSize ?? 3000;
      this.totalPages = Math.ceil(this.fullContent.length / this.pageSize);
      this.setPageText();
    });

    this.service.getNote(this.userId, this.bookId)
      .subscribe(note => {
        this.note = note;
        if (note) {
          this.noteContent = note.content;
        }
      })
  }

  setPageText() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pageText = this.fullContent.substring(start, end);
    if (!this.annotator) {
      this.annotator = new TextAnnotator();
    }
    const rawAnnotated = this.annotator.annotateText(
      this.pageText,
      this.allAnnotations,
      this.currentPage,
      this.pageSize
    );
    this.annotatedText = this.sanitizer.bypassSecurityTrustHtml(rawAnnotated);
  }

  getPageData(event: PageEvent) {
    if (!this.bookId) return;

    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize ?? this.pageSize;
    this.totalPages = Math.ceil(this.fullContent.length / this.pageSize);
    this.setPageText();
  }

  annotateText(event: MouseEvent) {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) {
      return;
    }

    this.selectedText = selection.toString();

    const range = selection?.getRangeAt(0);
    const textContainer = event.currentTarget as HTMLElement;
    const pageStartOffset = this.annotator?.getOffset(textContainer, range.startContainer, range.startOffset);
    const pageEndOffset = this.annotator?.getOffset(textContainer, range.endContainer, range.endOffset);

    if(pageStartOffset !== undefined && pageEndOffset !== undefined) {
      const startOffset = pageStartOffset + this.currentPage*this.pageSize;
      const endOffset = pageEndOffset + this.currentPage*this.pageSize;

      console.log('Selected text:', this.selectedText);
      console.log('Offsets:', startOffset, endOffset);
  
      console.log(this.selectedText);

      this.annotationDialog(this.selectedText, startOffset, endOffset);
    }
  }

  annotationDialog(text: string, start: number, end: number) {
    const dialogRef = this.dialog.open(AddAnnotationComponent, {
      data: {
        userId: this.userId,
        bookId: this.bookId,
        text,
        start,
        end
      }
    })

    dialogRef.componentInstance.annotationAdded.subscribe(() => {
        this.ngOnInit(),
        dialogRef.close();
      }
    )

  }

  updateAnnotation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('annotation')) {
      const id = target.getAttribute('data-id');
      const comment = target.getAttribute('data-comment');
      const tag = target.getAttribute('data-tag');
      const color = target.getAttribute('data-color');
      const start = target.getAttribute('data-start');
      const end = target.getAttribute('data-end');
      this.dialog.open(UpdateAnnotationComponent, {
        data: {
          id,
          start,
          end,
          comment,
          tag,
          color
        }
      })
    }
  }

  saveNote() {
    if(this.note) {
      this.service.updateNote(this.note.id, this.noteContent).subscribe();
    }
    else {
      this.service.addNote(this.bookId, this.userId, this.noteContent).subscribe();
    }
  }
}
