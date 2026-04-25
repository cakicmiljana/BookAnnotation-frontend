import { Note } from "src/app/models/note";

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

export const initialNotesState: NotesState = {
  notes: [],
  loading: false,
  error: null
};
