import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Book } from "src/app/models/book";

export interface BooksState extends EntityState<Book> {
    selectedBook: Book | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
    selectId: (book: Book) => book.id
});

export const initialState: BooksState = adapter.getInitialState({
    selectedBook: null
});