import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotesState } from "./notes.state";

export const selectNotesState = createFeatureSelector<NotesState>("notes");

export const selectAllNotes = createSelector(
  selectNotesState,
  (state) => state.notes
);

export const selectNotesLoading = createSelector(
  selectNotesState,
  (state) => state.loading
);

export const selectNotesError = createSelector(
  selectNotesState,
  (state) => state.error
);

// Selector to find a note by bookId and userId
export const selectNoteByBookAndUser = (bookId: number, userId: number) =>
  createSelector(
    selectAllNotes,
    (notes) => notes.find(n => n.bookId === bookId && n.userId === userId)
  );
