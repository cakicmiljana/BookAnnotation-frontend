import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  user: User | null = null;
  username: string = "";
  email: string = "";

  constructor() {
    
  }

  ngOnInit() {
    
  }

  updateUser() {

  }
}
