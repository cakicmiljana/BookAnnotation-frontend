import { createAction, props } from '@ngrx/store';
import { FeedItem } from 'src/app/models/feed-item';

export const loadFeed = createAction('[Feed] Load Feed', props<{ userId: number }>());
export const loadFeedSuccess = createAction('[Feed] Load Feed Success', props<{ feed: FeedItem[] }>());

export const addFeedItem = createAction('[Feed] Add Feed Item', props<{ item: FeedItem }>());