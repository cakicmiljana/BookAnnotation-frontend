export interface Annotation {
    id: number;
    bookId: number;
    userId: number;
    startOffset: number;
    endOffset: number;
    comment: string;
    tag: string;
}