import { AnnotationsState } from './annotations/annotations.state';
import { BooksState } from './books/books.state';
import { NotesState } from './notes/notes.state';
import { UsersState } from './users/users.state';

export interface AppState {
  auth: UsersState;
  books: BooksState;
  annotations: AnnotationsState;
  notes: NotesState;
}
