import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'app-empty-state', standalone: false,
    template: `<div class="empty-state"><div class="empty-icon"><mat-icon>{{ icon }}</mat-icon></div><h2>{{ title }}</h2><p>{{ message }}</p><button *ngIf="action" type="button" class="button" (click)="actionClick.emit()">{{ action }}</button><ng-content></ng-content></div>`,
    styles: [`.empty-state{text-align:center;padding:60px 24px;max-width:480px;margin:auto}.empty-icon{display:grid;place-items:center;background:var(--surface);color:var(--accent);width:66px;height:66px;margin:0 auto 22px;border-radius:50%}.empty-icon mat-icon{font-size:28px!important;width:28px!important;height:28px!important}h2{font-size:26px}p{color:var(--muted);font-size:13px}`]
})
export class EmptyStateComponent {
    @Input()
    icon = 'menu_book';
    @Input()
    title = 'Nothing here yet';
    @Input()
    message = '';
    @Input()
    action = '';
    @Output()
    actionClick = new EventEmitter<void>();
}
