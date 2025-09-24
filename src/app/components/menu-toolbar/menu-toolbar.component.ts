import { Component, EventEmitter, Output } from '@angular/core';
import { setUserId, getUserId } from 'src/environments/userLoggedIn';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.css']
})
export class MenuToolbarComponent {
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  logOut() {
    setUserId(0);
    this.logoutEvent.emit();
  }

}
