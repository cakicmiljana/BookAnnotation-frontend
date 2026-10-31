import { Component, EventEmitter, Input, Output } from '@angular/core';
export const ANNOTATION_COLORS = [
    { name: 'Ochre', value: 'lightyellow', swatch: '#f4e4b4' },
    { name: 'Sage', value: 'darkseagreen', swatch: '#dfe8d5' },
    { name: 'Rose', value: 'lightpink', swatch: '#f2dcdc' },
    { name: 'Blue', value: 'lightblue', swatch: '#dce8f1' },
    { name: 'Lavender', value: '#e8dff1', swatch: '#e8dff1' }
];
@Component({
    selector: 'app-annotation-fields', standalone: false,
    template: `<fieldset><legend>Highlight color</legend><div class="swatches"><button *ngFor="let item of colors" type="button" [class.selected]="color === item.value" [attr.aria-pressed]="color === item.value" [attr.aria-label]="item.name" (click)="colorChange.emit(item.value)"><span [style.background]="item.swatch"><mat-icon *ngIf="color === item.value">check</mat-icon></span><small>{{ item.name }}</small></button></div></fieldset>
  <label class="field">Tag<select [ngModel]="tag" (ngModelChange)="tagChange.emit($event)"><option value="">No tag</option><option *ngFor="let item of tags" [value]="item">{{ item | titlecase }}</option></select></label>
  <label class="field">Comment<textarea rows="4" [ngModel]="comment" (ngModelChange)="commentChange.emit($event)" placeholder="What does this passage bring to mind?"></textarea></label>`,
    styles: [`fieldset{border:0;padding:0;margin:0 0 22px;min-width:0}legend{font-size:12px;font-weight:500;margin-bottom:12px}.swatches{display:flex;gap:5px;justify-content:space-between}.swatches button{padding:7px 3px;background:transparent;border:1px solid transparent;border-radius:5px;min-width:43px;color:var(--muted)}.swatches button.selected{border-color:var(--accent);color:var(--accent)}.swatches span{display:grid;place-items:center;width:27px;height:27px;margin:auto auto 7px;border-radius:50%;color:var(--ink)}small{font-size:9px}`]
})
export class AnnotationFieldsComponent {
    colors = ANNOTATION_COLORS;
    tags = ['important', 'analysis', 'quote', 'definition', 'question', 'symbolism', 'motif', 'criticism'];
    @Input()
    color = 'lightyellow';
    @Input()
    tag = '';
    @Input()
    comment = '';
    @Output()
    colorChange = new EventEmitter<string>();
    @Output()
    tagChange = new EventEmitter<string>();
    @Output()
    commentChange = new EventEmitter<string>();
}
