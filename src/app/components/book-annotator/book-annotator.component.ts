import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Version } from 'src/app/models/version';
import { Annotation } from 'src/app/models/annotation';

import { VersionsService } from 'src/app/services/versions.service';
import { TextAnnotator } from 'src/app/helper classes/TextAnnotator';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnotationComponent } from '../add-annotation/add-annotation.component';
import { UpdateAnnotationComponent } from '../update-annotation/update-annotation.component';
import { Note } from 'src/app/models/note';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
    selector: 'app-book-annotator',
    templateUrl: './book-annotator.component.html',
    styleUrls: ['./book-annotator.component.css'],
    standalone: false
})
export class BookAnnotatorComponent {
  @Input() version: Version | null = null;

  showNote: boolean = false;
  note: Note | undefined = undefined;
  noteContent: string = "";

  get userId(): number {
    return getUserId();
  }

  routerId: string | null = '';
  versionId: number = 0;

  currentPage = 0;
  pageSize = 3000;
  totalPages = 0;

  pageText = '';
  annotatedText: SafeHtml = '';

  annotator: TextAnnotator | null = null;
  allAnnotations: Annotation[] = [];

  // new annotation
  selectedText: string = "";

  dialog = inject(MatDialog);

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: VersionsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get('id');
    if (this.routerId && this.routerId.startsWith(':')) {
      this.versionId = Number(this.routerId.slice(1));
    }
    
    if (!this.versionId) return;
    
    forkJoin({
      version: this.service.getVersionById(this.versionId),
      annotations: this.service.getAnnotationsByVersionId(this.versionId),
      content: this.service.getPageContent(this.versionId, this.currentPage, this.pageSize)
    }).subscribe(({ version, annotations, content }) => {
      this.version = version ?? null;
      this.allAnnotations = annotations ?? [];
      this.pageText = content ?? '';
      
      this.totalPages = content.length*this.pageSize
      
      this.annotator = new TextAnnotator();
      const rawAnnotated = this.annotator.annotateText(
        this.pageText,
        this.allAnnotations,
        this.currentPage,
        this.pageSize
      );
      this.annotatedText = this.sanitizer.bypassSecurityTrustHtml(rawAnnotated);
    });

    this.service.getNoteByVersionId(this.versionId)
      .subscribe(note => {
        this.note = note;
        if (note) {
          this.noteContent = note.content;
        }
      })
  }

  getPageData(event: PageEvent) {
    if (this.versionId === null) return;

    const nextPage = event.pageIndex;
    const nextSize = event.pageSize ?? this.pageSize;

    this.service
      .getPageContent(this.versionId, nextPage, nextSize)
      .subscribe(content => {
        this.pageText = content ?? '';
        this.pageSize = nextSize;
        this.currentPage = nextPage;

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
      });
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
        versionId: this.versionId,
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
      this.service.addNote(this.versionId, this.userId, this.noteContent).subscribe();
    }
  }
}
