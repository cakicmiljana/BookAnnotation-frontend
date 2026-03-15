import { Annotation } from '../models/annotation';
import { AnnotationsState } from './annotations/annotations.state';
import { BooksState } from './books/books.state';
import {  } from './users/users.reducer';
// import { FeedState } from './feed/feed.reducer';
// import { BooksState } from './books/books.reducer';
// import { ProfileState } from './profile/profile.reducer';
import { UsersState } from './users/users.state';

export interface AppState {
  auth: UsersState;
  books: BooksState;
  annotations: AnnotationsState;
//   feed: FeedState; 
//   profile: ProfileState;
}