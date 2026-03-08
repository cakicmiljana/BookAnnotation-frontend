import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/users/users.action';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
    selector: 'app-menu-toolbar',
    templateUrl: './menu-toolbar.component.html',
    styleUrls: ['./menu-toolbar.component.css'],
    standalone: false
})
export class MenuToolbarComponent {
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {

  }

  logout() {
      this.store.dispatch(
        logout()
      );
    }

}
