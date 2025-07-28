import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.css']
})
export class MenuToolbarComponent {
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  logOut() {
    this.logoutEvent.emit();
  }

}
