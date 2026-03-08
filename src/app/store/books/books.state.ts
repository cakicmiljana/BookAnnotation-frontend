import { Book } from "src/app/models/book";

export interface BooksState {
    books: Book[];
    selectedBook: Book | null;
}

export const initialState: BooksState = {
    books: [],
    selectedBook: null
};