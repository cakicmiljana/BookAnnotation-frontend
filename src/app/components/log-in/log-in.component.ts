import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersService } from 'src/app/services/users.service';
import { AppState } from 'src/app/store/app.state';
import { login } from 'src/app/store/users/users.action';
import { selectAuthError, selectIsLoggedIn, selectLoading } from 'src/app/store/users/users.selector';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
    standalone: false
})
export class LogInComponent {
  username = '';
  password = '';

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private router: Router, private store: Store<AppState>) {
    
  }

  login() {
    this.store.dispatch(
      login({ username: this.username, password: this.password })
    );
  }
}
