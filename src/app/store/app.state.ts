import {  } from './users/users.reducer';
// import { FeedState } from './feed/feed.reducer';
// import { BooksState } from './books/books.reducer';
// import { ProfileState } from './profile/profile.reducer';
import { UsersState } from './users/users.state';

export interface AppState {
  auth: UsersState;
//   feed: FeedState;
//   books: BooksState;
//   profile: ProfileState;
}