import { createReducer, on } from '@ngrx/store';
import { initialFeedState, adapter } from './feed.state';
import * as FeedActions from './feed.action';

export const feedReducer = createReducer(
  initialFeedState,
  on(FeedActions.loadFeed, state => ({ 
    ...state, 
    loading: true 
  })),
  on(FeedActions.loadFeedSuccess, (state, { feed }) =>
    adapter.setAll(feed, { ...state, loading: false })
  ),
  on(FeedActions.addFeedItem, (state, { item }) =>
    adapter.addOne(item, { ...state, loading: false })
  )
);