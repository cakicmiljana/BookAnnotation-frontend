import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class PresentationService {
    link(path: string, id?: number): (string | number)[] {
        if (id === undefined) {
            return ['/', path];
        }
        return ['/', path, id];
    }
}
