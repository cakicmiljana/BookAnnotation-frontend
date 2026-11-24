import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/** Presentation-only route helpers. Preview never changes authentication state. */
@Injectable({ providedIn: 'root' })
export class PresentationService {
    constructor(private router: Router) { }
    get preview(): boolean { return /^\/preview(?:\/|\?|$)/.test(this.router.url); }
    link(path: string, id?: number): (string | number)[] {
        return [this.preview ? '/preview' : '/', path, ...(id === undefined ? [] : [id])];
    }
}
