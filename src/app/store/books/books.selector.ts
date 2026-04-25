import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState, adapter } from "./books.state";

export const selectBooksState =
    createFeatureSelector<BooksState>("books");

// Entity adapter selectors
export const {
    selectIds: selectBookIds,
    selectEntities: selectBookEntities,
    selectAll: selectAllBooks,
    selectTotal: selectTotalBooks
} = adapter.getSelectors(selectBooksState);

export const selectBooks = selectAllBooks;

export const selectSelectedBook = createSelector(
    selectBooksState,
    (state) => state.selectedBook
);

// Selector to get a book by ID
export const selectBookById = (id: number) =>
    createSelector(
        selectBookEntities,
        (entities) => entities[id]
    );