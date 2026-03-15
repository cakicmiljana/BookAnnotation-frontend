import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectFeed, selectFeedLoading } from 'src/app/store/feed/feed.selector';
import { loadFeed } from 'src/app/store/feed/feed.action';
import { selectUserId } from 'src/app/store/users/users.selector';
import { FeedItem } from 'src/app/models/feed-item';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: false
})
export class FeedComponent implements OnInit {
  feed$ = this.store.select(selectFeed);
  loading$ = this.store.select(selectFeedLoading);

  userId = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe(uid => {
      if (!uid) return;
      this.userId = uid;
      this.store.dispatch(loadFeed({ userId: this.userId }));
    });
  }
}