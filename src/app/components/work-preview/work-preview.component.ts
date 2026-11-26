import { Component, Input } from '@angular/core';
import { Work } from 'src/app/models/work';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-work-preview',
    templateUrl: './work-preview.component.html',
    styleUrls: ['../book-preview/book-preview.component.css'],
    standalone: false
})
export class WorkPreviewComponent {
    @Input()
    work!: Work;
    @Input()
    compact = false;
    constructor(public ui: PresentationService) {
    }
}
