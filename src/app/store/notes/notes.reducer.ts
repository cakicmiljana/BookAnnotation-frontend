import { createReducer, on } from "@ngrx/store";
import * as NotesActions from "./notes.actions";
import { initialNotesState } from "./notes.state";
import { Note } from "src/app/models/note";

function putNote(notes: Note[], note: Note): Note[] {
  const otherNotes = notes.filter(n => n.editionId !== note.editionId);
  return [...otherNotes, note];
}

export const notesReducer = createReducer(
  initialNotesState,

  on(NotesActions.getNote, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(NotesActions.getNoteSuccess, (state, { note }) => ({
    ...state,
    notes: note ? putNote(state.notes, note) : state.notes,
    loading: false
  })),

  on(NotesActions.saveNote, (state) => ({
    ...state,
    saving: true,
    error: null
  })),

  on(NotesActions.saveNoteSuccess, (state, { note }) => ({
    ...state,
    notes: putNote(state.notes, note),
    saving: false
  })),

  on(NotesActions.getNoteFailure, NotesActions.saveNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    saving: false,
    error
  }))
);
