import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, OnChanges, ViewChild } from '@angular/core';
import { findTextMatches, TextMatch } from './text-search';
@Component({
    selector: 'app-book-search', standalone: false,
    templateUrl: './book-search.component.html', styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnChanges, AfterViewInit {
    @Input() text = '';
    @Output() matchSelected = new EventEmitter<TextMatch | null>();
    @Output() closed = new EventEmitter<void>();
    @ViewChild('findInput') findInput?: ElementRef<HTMLInputElement>;
    query = '';
    matches: TextMatch[] = [];
    activeIndex = -1;

    ngOnChanges(): void {
        this.query = '';
        this.search();
    }

    ngAfterViewInit(): void {
        this.findInput?.nativeElement.focus();
    }

    search(): void {
        this.matches = findTextMatches(this.text, this.query);
        this.activeIndex = this.matches.length ? 0 : -1;
        this.matchSelected.emit(this.matches[this.activeIndex] ?? null);
    }

    moveMatch(direction: number): void {
        if (!this.matches.length) return;
        this.activeIndex = (this.activeIndex + direction + this.matches.length) % this.matches.length;
        this.matchSelected.emit(this.matches[this.activeIndex]);
    }

    onKeydown(event: Event): void {
        const key = event as KeyboardEvent;
        if (key.key === 'Enter') {
            event.preventDefault();
            this.moveMatch(key.shiftKey ? -1 : 1);
        } else if (key.key === 'Escape') {
            event.preventDefault();
            this.closed.emit();
        }
    }
}
