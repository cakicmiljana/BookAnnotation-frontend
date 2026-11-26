import { AnnotationsState } from './annotations/annotations.state';
import { BooksState } from './books/books.state';
import { NotesState } from './notes/notes.state';
import { UsersState } from './users/users.state';
import { WorksState } from './works/works.state';

export interface AppState {
  auth: UsersState;
  books: BooksState;
  works: WorksState;
  annotations: AnnotationsState;
  notes: NotesState;
}
