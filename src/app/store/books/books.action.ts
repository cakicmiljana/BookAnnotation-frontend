import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadBooks = createAction("Load Books");
export const loadBooksSuccess = createAction("Load Books Success", props<{ books: Book[] }>());
export const loadBook = createAction("Load Book", props<{ id: number }>());
export const loadBookSuccess = createAction("Load Book Success", props<{ book: Book }>());

export const uploadBook = createAction("Upload Book", props<{ book: Book }>());
export const uploadBookSuccess = createAction("Upload Book Success", props<{ book: Book }>());
export const uploadBookFailure = createAction("Upload Book Failure", props<{ error: string }>());