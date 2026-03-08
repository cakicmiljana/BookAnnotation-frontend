import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState } from "./books.state";

export const selectBooksState =
  createFeatureSelector<BooksState>("books");

export const selectBooks = createSelector(
  selectBooksState,
  (state) => state.books
);

export const selectSelectedBook = createSelector(
  selectBooksState,
  (state) => state.selectedBook
);