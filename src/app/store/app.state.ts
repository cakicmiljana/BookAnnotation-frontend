import { AnnotationsState } from './annotations/annotations.state';
import { EditionsState } from './editions/editions.state';
import { NotesState } from './notes/notes.state';
import { UsersState } from './users/users.state';
import { WorksState } from './works/works.state';

export interface AppState {
  auth: UsersState;
  editions: EditionsState;
  works: WorksState;
  annotations: AnnotationsState;
  notes: NotesState;
}
