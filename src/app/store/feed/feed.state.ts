import { FeedItem } from 'src/app/models/feed-item';

export interface FeedState {
  feed: FeedItem[];
  loading: boolean;
}

export const initialFeedState: FeedState = {
  feed: [],
  loading: false,
};