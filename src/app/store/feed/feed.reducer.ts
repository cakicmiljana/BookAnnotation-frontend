import { createReducer, on } from '@ngrx/store';
import { initialFeedState } from './feed.state';
import * as FeedActions from './feed.action';

export const feedReducer = createReducer(
  initialFeedState,
  on(FeedActions.loadFeed, state => ({ 
    ...state, 
    loading: true 
})),
  on(FeedActions.loadFeedSuccess, (state, { feed }) => ({ 
    ...state, 
    feed, 
    loading: false 
  })),
  on(FeedActions.addFeedItem, (state, { item }) => ({ ...state, 
    feed: [item, ...state.feed] 
  }))
);