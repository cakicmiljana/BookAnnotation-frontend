import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadWorks } from 'src/app/store/works/works.action';
import { selectWorks } from 'src/app/store/works/works.selector';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: false
})
export class BookListComponent {
  works$ = this.store.select(selectWorks);

  ngOnInit() {
    this.store.dispatch(loadWorks());
  }

  constructor(private store: Store<AppState>) {

  }

}
