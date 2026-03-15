// src/app/store/feed/feed.selector.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FeedState } from './feed.state';

export const selectFeedState = (state: AppState) => state.feed;

export const selectFeed = createSelector(selectFeedState, (state: FeedState) => state.feed);
export const selectFeedLoading = createSelector(selectFeedState, (state: FeedState) => state.loading);