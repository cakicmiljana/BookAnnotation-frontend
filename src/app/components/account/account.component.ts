import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectCurrentUser } from 'src/app/store/users/users.selector';
import { User } from 'src/app/models/user';
import { AccountUpdateComponent } from '../account-update/account-update.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: false
})
export class AccountComponent implements OnInit {

  user: User | null = null;
  dialog = inject(MatDialog);
  store = inject(Store<AppState>);

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(user => {
      this.user = user;
    });
  }

  openUserUpdateDialog() {
    if (!this.user) return;
    this.dialog.open(AccountUpdateComponent, {
      data: this.user
    });
  }

}