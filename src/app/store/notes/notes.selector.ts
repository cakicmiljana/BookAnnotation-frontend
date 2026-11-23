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

// Selector to find a note by editionId and userId
export const selectNoteByBookAndUser = (editionId: number, userId: number) =>
  createSelector(
    selectAllNotes,
    (notes) => notes.find(n => n.editionId === editionId && n.userId === userId)
  );
