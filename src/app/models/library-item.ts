import { Book } from './book';

export interface LibraryItem extends Book {
    addedAt: string;
    lastOpenedAt: string | null;
    lastPosition: number;
}
