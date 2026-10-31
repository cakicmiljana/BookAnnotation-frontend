import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/** Presentation-only route helpers. Preview never changes authentication state. */
@Injectable({ providedIn: 'root' })
export class PresentationService {
    private noteDrafts = new Map<string, string>();
    constructor(private router: Router) { }
    get preview(): boolean { return /^\/preview(?:\/|\?|$)/.test(this.router.url); }
    link(path: string, id?: number): (string | number)[] {
        return [this.preview ? '/preview' : '/', path, ...(id === undefined ? [] : [id])];
    }
    getNoteDraft(bookId: number, userId: number): string | undefined { return this.noteDrafts.get(this.draftKey(bookId, userId)); }
    keepNoteDraft(bookId: number, userId: number, text: string): void { this.noteDrafts.set(this.draftKey(bookId, userId), text); }
    private draftKey(bookId: number, userId: number): string { return [this.preview ? 'preview' : 'account', userId, bookId].join(':'); }
}
