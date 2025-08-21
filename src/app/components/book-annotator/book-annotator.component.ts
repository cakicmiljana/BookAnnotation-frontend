import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Version } from 'src/app/models/version';
import { Annotation } from 'src/app/models/annotation';

import { VersionsService } from 'src/app/services/versions.service';
import { TextAnnotator } from 'src/app/helper classes/TextAnnotator';

@Component({
  selector: 'app-book-annotator',
  templateUrl: './book-annotator.component.html',
  styleUrls: ['./book-annotator.component.css']
})
export class BookAnnotatorComponent {
  @Input() version: Version | null = null;

  userId: number = 1;

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
  selectedComment: string = "";
  selectedTag: string = "";
  selectedColor: string = "lightblue";

  constructor(
    private versionsService: VersionsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get('id');
    if (this.routerId && this.routerId.startsWith(':')) {
      this.versionId = Number(this.routerId.slice(1));
    }
    
    if (!this.versionId) return;
    
    forkJoin({
      version: this.versionsService.getVersionById(this.versionId),
      annotations: this.versionsService.getAnnotationsByVersionId(this.versionId),
      content: this.versionsService.getPageContent(this.versionId, this.currentPage, this.pageSize)
    }).subscribe(({ version, annotations, content }) => {
      this.version = version;
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
  }

  getPageData(event: PageEvent) {
    if (this.versionId === null) return;

    const nextPage = event.pageIndex;
    const nextSize = event.pageSize ?? this.pageSize;

    this.versionsService
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

      this.versionsService.addAnnotation(this.versionId, this.userId, startOffset, endOffset, this.selectedComment, this.selectedTag, this.selectedColor)
        .subscribe();
    }

  }
}
