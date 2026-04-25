import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FeedItem } from 'src/app/models/feed-item';

export interface FeedState extends EntityState<FeedItem> {
  loading: boolean;
}

export const adapter: EntityAdapter<FeedItem> = createEntityAdapter<FeedItem>({
  selectId: (item: FeedItem) => item.id
});

export const initialFeedState: FeedState = adapter.getInitialState({
  loading: false
});