import { createReducer, on } from "@ngrx/store";
import * as BooksActions from "./books.action";
import { initialState } from "./books.state";

export const booksReducer = createReducer(
  initialState,

  on(BooksActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books
  })),

  on(BooksActions.loadBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book // only update on success, never clear on loadBook
  }))
);