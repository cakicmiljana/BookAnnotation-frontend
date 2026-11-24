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

export const selectNoteSaving = createSelector(
  selectNotesState,
  (state) => state.saving
);

export const selectNotesError = createSelector(
  selectNotesState,
  (state) => state.error
);

export const selectNoteByEdition = (editionId: number) =>
  createSelector(
    selectAllNotes,
    (notes) => notes.find(n => n.editionId === editionId)
  );
