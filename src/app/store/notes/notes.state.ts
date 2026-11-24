import { Note } from "src/app/models/note";

export interface NotesState {
  notes: Note[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export const initialNotesState: NotesState = {
  notes: [],
  loading: false,
  saving: false,
  error: null
};
