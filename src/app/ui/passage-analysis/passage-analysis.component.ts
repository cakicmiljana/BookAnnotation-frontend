import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
@Component({
    selector: 'app-passage-analysis', standalone: false,
    templateUrl: './passage-analysis.component.html', styleUrls: ['./passage-analysis.component.css', './analysis-workspace.css']
})
export class PassageAnalysisComponent implements OnChanges {
    @Input() workspace = false;
    @Input()
    passage = '';
    @Input()
    bookTitle = '';
    @Output()
    saveToNotes = new EventEmitter<string>();
    lens = 'Close reading';
    lenses = ['Close reading', 'Themes', 'Imagery', 'Symbolism', 'Narrative voice'];
    generated = false;
    followUp = '';
    followUpSent = false;
    saved = false;
    ngOnChanges(): void { this.generated = false; this.saved = false; this.followUp = ''; this.followUpSent = false; }
    get example(): string { return 'The passage invites us to notice the distance between what is observed and what is understood. Its images can be read as a meeting point between the external world and the narrator’s inner life.'; }
    save(): void { this.saveToNotes.emit('[Illustrative AI analysis · ' + this.lens + ']\n' + this.example); this.saved = true; }
}
