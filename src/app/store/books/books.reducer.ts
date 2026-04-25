import { createReducer, on } from "@ngrx/store";
import * as BooksActions from "./books.action";
import { initialState, adapter } from "./books.state";

export const booksReducer = createReducer(
  initialState,

  on(BooksActions.loadBooksSuccess, (state, { books }) =>
    adapter.setAll(books, { ...state, selectedBook: state.selectedBook })
  ),

  on(BooksActions.loadBookSuccess, (state, { book }) =>
    adapter.upsertOne(book, { ...state, selectedBook: book })
  )
);