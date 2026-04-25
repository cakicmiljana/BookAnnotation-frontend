// src/app/store/feed/feed.selector.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FeedState, adapter } from './feed.state';

export const selectFeedState = (state: AppState) => state.feed;

// Entity adapter selectors
export const {
  selectIds: selectFeedItemIds,
  selectEntities: selectFeedItemEntities,
  selectAll: selectAllFeedItems,
  selectTotal: selectTotalFeedItems
} = adapter.getSelectors(selectFeedState);

export const selectFeed = selectAllFeedItems;

export const selectFeedLoading = createSelector(
  selectFeedState,
  (state: FeedState) => state.loading
);

// Selector to get a feed item by ID
export const selectFeedItemById = (id: number) =>
  createSelector(
    selectFeedItemEntities,
    (entities) => entities[id]
  );