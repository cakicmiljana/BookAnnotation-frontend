import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Version } from 'src/app/models/version';
import { BooksService } from 'src/app/services/books.service';
import { VersionsService } from 'src/app/services/versions.service';
import { PageEvent } from '@angular/material/paginator';
import { TextFormatter } from 'src/app/helper classes/TextFormatter';

@Component({
  selector: 'app-book-annotator',
  templateUrl: './book-annotator.component.html',
  styleUrls: ['./book-annotator.component.css']
})
export class BookAnnotatorComponent {
  @Input() version: Version | null = null;
  routerId: string | null = "";
  versionId: number | null = null;
  
  pageContent: string | null = null;
  page: number = 0;
  pageSize: number = 1000;

  fullText: string = '';
  paginator: TextFormatter | null = null;
  currentPage = 0;
  totalPages = 0;
  pageText: string = '';

  constructor(private booksService: BooksService, private versionsService: VersionsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.paramMap.get("id");
    if (this.routerId && this.routerId.startsWith(":")) {
      this.versionId = Number(this.routerId.slice(1));
    }

    if(this.versionId) {
      this.versionsService.getVersionById(this.versionId)
        .subscribe(b => this.version=b)

      this.versionsService.getPageContent(this.versionId, this.page, this.pageSize)
        .subscribe(c => this.pageContent = c);

      this.versionsService.getPageContent(this.versionId, this.page, this.pageSize)
        .subscribe(c => this.pageText = c);

        this.paginator = new TextFormatter(this.fullText, 2000); // 2000 chars/page
        this.totalPages = this.paginator.getPageCount();
        this.pageText = this.paginator.getPage(this.currentPage);
    }
  }

  getPageData(event: PageEvent) {
    if(this.versionId !== null) {
      this.versionsService.getPageContent(this.versionId, event.pageIndex, event.pageSize)
          .subscribe(c => this.pageContent=c)
          
      this.versionsService.getPageContent(this.versionId, event.pageIndex, event.pageSize)
          .subscribe(c => this.pageText=c)
          
      this.currentPage = event.pageIndex;
      if (this.paginator) {
        this.pageText = this.paginator.getPage(this.currentPage);
      }
    }
  }
}
