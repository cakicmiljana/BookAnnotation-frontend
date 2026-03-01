import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
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
  errorMessage = '';
  get userId(): number {
    return getUserId();
  }

  constructor(private userService: UsersService, private router: Router) {
    
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: (res) => {
          if (res && res.id) {
            setUserId(res.id);
            this.router.navigate(['/all-books']);
            console.log('Login successful. User ID:', res.id);
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
