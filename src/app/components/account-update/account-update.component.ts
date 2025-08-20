import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent {
  data = inject(MAT_DIALOG_DATA);

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private service: UsersService) {

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
        .subscribe()
  }

}
