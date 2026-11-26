import { Component, Input } from '@angular/core';
import { Edition } from 'src/app/models/edition';
import { EditionsService } from 'src/app/services/editions.service';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-version-preview',
    templateUrl: './version-preview.component.html',
    styleUrls: ['./version-preview.component.css'],
    standalone: false
})
export class VersionPreviewComponent {
    @Input()
    version: Edition | null = null;
    constructor(private service: EditionsService, public ui: PresentationService) {
    }
}
