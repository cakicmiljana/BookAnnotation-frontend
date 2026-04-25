import { createReducer, on } from "@ngrx/store";
import * as NotesActions from "./notes.actions";
import { initialNotesState } from "./notes.state";

export const notesReducer = createReducer(
  initialNotesState,

  on(NotesActions.getNoteSuccess, (state, { note }) => ({
    ...state,
    notes: note ? [note, ...state.notes.filter(n => n.id !== note.id)] : state.notes,
    error: null
  })),

  on(NotesActions.createNoteSuccess, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note],
    error: null
  })),

  on(NotesActions.updateNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n => n.id === note.id ? note : n),
    error: null
  })),

  on(NotesActions.deleteNoteSuccess, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(n => n.id !== id),
    error: null
  })),

  on(NotesActions.getNoteFailure, NotesActions.createNoteFailure, NotesActions.updateNoteFailure, NotesActions.deleteNoteFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
