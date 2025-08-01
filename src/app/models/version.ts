import { Book } from "./book";

export interface Version {
    id: number;
    content: string;
    fileType: string;
    language: string;
    userId: number;
    bookId: number;
    book: Book;
    pageSize: number;
}