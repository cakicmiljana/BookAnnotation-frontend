import { createAction, props } from "@ngrx/store";
import { Note } from "src/app/models/note";

export const getNote = createAction("Get Note", props<{ editionId: number }>());
export const getNoteSuccess = createAction("Get Note Success", props<{ note: Note | null }>());
export const getNoteFailure = createAction("Get Note Failure", props<{ error: string }>());

export const saveNote = createAction("Save Note", props<{ editionId: number; content: string }>());
export const saveNoteSuccess = createAction("Save Note Success", props<{ note: Note }>());
export const saveNoteFailure = createAction("Save Note Failure", props<{ error: string }>());
