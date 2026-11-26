import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Edition } from 'src/app/models/edition';
import { AppState } from 'src/app/store/app.state';
import { loadEdition } from 'src/app/store/editions/editions.action';
import { PresentationService } from '../../ui/presentation.service';
@Component({
    selector: 'app-edition-preview',
    templateUrl: './edition-preview.component.html',
    styleUrls: ['./edition-preview.component.css'],
    standalone: false
})
export class EditionPreviewComponent {
    @Input()
    edition: Edition | null | undefined = null;
    @Input()
    compact = false;
    constructor(private store: Store<AppState>, public ui: PresentationService) {
    }
    selectEdition(id: number) {
        this.store.dispatch(loadEdition({ id }));
    }
}
