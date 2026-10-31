import { Component, Input } from '@angular/core';
import { Book } from '../models/book';
@Component({
    selector: 'app-book-cover', standalone: false,
    template: `<div class="cover"><img *ngIf="!failed && book" [src]="'assets/' + book.id + '.jpg'" [alt]="book.title + ' cover'" (error)="failed = true" loading="lazy"><div *ngIf="failed || !book" class="fallback-content"><span>THE READING COLLECTION</span><strong>{{ book?.title || 'Untitled edition' }}</strong><i>{{ book?.author }}</i></div></div>`,
    styles: [`:host{display:block;flex-shrink:0}.cover{aspect-ratio:2/3;overflow:hidden;background:#e0d5bd;border-radius:2px;box-shadow:2px 3px 9px #302b281a;position:relative}.cover:after{content:'';position:absolute;inset:0;box-shadow:inset 4px 0 7px #302b2820;pointer-events:none}.cover img{display:block;width:100%;height:100%;object-fit:cover}.fallback-content{height:100%;padding:20% 12%;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;color:#5b483f;background:repeating-linear-gradient(45deg,transparent,transparent 8px,#fff2 8px,#fff2 9px)}span{font-size:7px;letter-spacing:.15em}strong{font:500 clamp(13px,2vw,24px)/1.2 var(--serif);margin:22% 0}i{font:11px var(--serif)}`]
})
export class BookCoverComponent {
    private currentBook: Book | null | undefined;
    failed = false;
    @Input()
    set book(value: Book | null | undefined) { this.currentBook = value; this.failed = false; }
    get book(): Book | null | undefined { return this.currentBook; }
}
