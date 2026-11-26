import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadWorks } from 'src/app/store/works/works.action';
import { selectWorks } from 'src/app/store/works/works.selector';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
  standalone: false
})
export class WorkListComponent {
  works$ = this.store.select(selectWorks);

  ngOnInit() {
    this.store.dispatch(loadWorks());
  }

  constructor(private store: Store<AppState>) {

  }

}
