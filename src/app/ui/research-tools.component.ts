import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationService } from './presentation.service';

export type ResearchTool = 'search' | 'analysis';

@Component({
    selector: 'app-research-tools',
    standalone: false,
    template: `
      <nav class="research-tools" aria-label="Literary research tools">
        <ng-container *ngFor="let tool of tools">
          <a *ngIf="navigate; else workspaceButton" class="research-tool"
            [routerLink]="ui.link('book-annotator', bookId)" [queryParams]="{mode: tool.key}">
            <ng-container *ngTemplateOutlet="toolContent; context: {$implicit: tool}"></ng-container>
          </a>
          <ng-template #workspaceButton>
            <button type="button" class="research-tool" [class.active]="active === tool.key"
              [attr.aria-pressed]="active === tool.key" (click)="toolSelected.emit(tool.key)">
              <ng-container *ngTemplateOutlet="toolContent; context: {$implicit: tool}"></ng-container>
            </button>
          </ng-template>
        </ng-container>
      </nav>
      <ng-template #toolContent let-tool>
        <span class="tool-icon"><mat-icon>{{ tool.icon }}</mat-icon></span>
        <span class="tool-copy"><strong>{{ tool.title }}</strong><span>{{ tool.description }}</span></span>
        <mat-icon class="tool-arrow">arrow_forward</mat-icon>
      </ng-template>
    `,
    styleUrls: ['./research-tools.component.css']
})
export class ResearchToolsComponent {
    @Input() bookId = 0;
    @Input() navigate = true;
    @Input() active = '';
    @Output() toolSelected = new EventEmitter<ResearchTool>();
    readonly tools = [
        { key: 'search' as const, title: 'Semantic Search', icon: 'manage_search', description: 'Find passages by idea, theme, or meaning.' },
        { key: 'analysis' as const, title: 'AI Literary Analysis', icon: 'auto_awesome', description: 'Explore imagery, motifs, and interpretations.' }
    ];
    constructor(public ui: PresentationService) {}
}
