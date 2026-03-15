import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/users/users.action';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';
import { AccountComponent } from '../account/account.component';

@Component({
    selector: 'app-menu-toolbar',
    templateUrl: './menu-toolbar.component.html',
    styleUrls: ['./menu-toolbar.component.css'],
    standalone: false
})
export class MenuToolbarComponent {
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  dialog = inject(MatDialog);

  constructor(private store: Store<AppState>) {

  }

  logout() {
      this.store.dispatch(
        logout()
      );
    }

  openAccountDialog() {
    this.dialog.open(AccountComponent, {
  width: '400px',
  position: { top: '70px', right: '20px' },
  panelClass: 'account-dialog',  // custom class
  hasBackdrop: true,
  backdropClass: 'custom-backdrop'
});
  }
}
