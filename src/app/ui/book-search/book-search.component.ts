import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Book } from '../../models/book';
export interface PassagePreview {
    text: string;
    offset: number;
}
@Component({
    selector: 'app-book-search', standalone: false,
    templateUrl: './book-search.component.html', styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnChanges {
    @Input()
    book: Book | null = null;
    @Output()
    openPassage = new EventEmitter<PassagePreview>();
    @Output()
    analyzePassage = new EventEmitter<PassagePreview>();
    query = '';
    mode = 'semantic';
    submitted = false;
    scope = 'all';
    ngOnChanges(): void {
        this.query = '';
        this.submitted = false;
        this.scope = 'all';
    }
    get passages(): PassagePreview[] {
        const content = this.book?.content || '';
        let cursor = 0;
        return content.split(/\n\s*\n/).filter(Boolean).map(text => {
            const offset = content.indexOf(text, cursor);
            cursor = offset + text.length;
            return { text: text.slice(0, 360), offset };
        });
    }
    get results(): PassagePreview[] {
        const passages = this.scope === 'opening' ? this.passages.slice(0, 1) : this.passages;
        if (!this.submitted || this.mode === 'semantic')
            return passages.slice(0, 5);
        return passages.filter(item => item.text.toLowerCase().includes(this.query.toLowerCase().trim()));
    }
    parts(text: string): {
        before: string;
        match: string;
        after: string;
    } {
        const query = this.query.trim();
        const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
        return index < 0 ? { before: text, match: '', after: '' } : { before: text.slice(0, index), match: text.slice(index, index + query.length), after: text.slice(index + query.length) };
    }
}
