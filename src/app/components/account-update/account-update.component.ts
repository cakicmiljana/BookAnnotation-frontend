import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-account-update',
    templateUrl: './account-update.component.html',
    styleUrls: ['./account-update.component.css'],
    standalone: false
})
export class AccountUpdateComponent {
  data = inject(MAT_DIALOG_DATA);

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private service: UsersService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if(this.data) {
      this.username = this.data.username;
      this.email = this.data.email;
    }
  }

  updateUser() {
    console.log(this.data.id, this.username, this.email, this.password)
    this.service.updateUser(this.data.id, this.username, this.email, this.password)
        .subscribe({
          next: (res) => {
            this.snackBar.open('You successfully updated your data ✅', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            this.snackBar.open('Data update failed ❌', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            console.error(err);
          }
        })
  }

}
