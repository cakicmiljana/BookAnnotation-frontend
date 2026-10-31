import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from './store/users/users.selector';
import { PresentationService } from './ui/presentation.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
    title = 'book-annotation-app';
    isLoggedIn$: Observable<boolean>;
    constructor(private store: Store, public ui: PresentationService) {
        this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    }
}
