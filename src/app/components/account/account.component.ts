import { Component, inject, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: false
})
export class AccountComponent {
  @Input() user: User | null = null;

  dialog = inject(MatDialog);

  constructor(private service: UsersService) {
    
  }

  ngOnInit() {
    this.service.getUserById(getUserId())
      .subscribe(u => this.user = u || null);
  }

  openUserUpdateDialog() {
    this.dialog.open(AccountUpdateComponent, {
      data: this.user
    })
  }
}
