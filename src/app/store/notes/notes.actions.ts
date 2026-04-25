import { createAction, props } from "@ngrx/store";
import { Note } from "src/app/models/note";

export const getNote = createAction("Get Note", props<{ bookId: number; userId: number }>());
export const getNoteSuccess = createAction("Get Note Success", props<{ note: Note | undefined }>());
export const getNoteFailure = createAction("Get Note Failure", props<{ error: string }>());

export const createNote = createAction("Create Note", props<{ note: Note }>());
export const createNoteSuccess = createAction("Create Note Success", props<{ note: Note }>());
export const createNoteFailure = createAction("Create Note Failure", props<{ error: string }>());

export const updateNote = createAction("Update Note", props<{ note: Note }>());
export const updateNoteSuccess = createAction("Update Note Success", props<{ note: Note }>());
export const updateNoteFailure = createAction("Update Note Failure", props<{ error: string }>());

export const deleteNote = createAction("Delete Note", props<{ id: number }>());
export const deleteNoteSuccess = createAction("Delete Note Success", props<{ id: number }>());
export const deleteNoteFailure = createAction("Delete Note Failure", props<{ error: string }>());
