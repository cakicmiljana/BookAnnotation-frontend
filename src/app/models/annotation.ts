export interface Annotation {
    id: number;
    bookId: number;
    userId: number;
    startOffset: number;
    endOffset: number;
    comment: string;
    tag: string;
    color: string;
    visibility: 'public' | 'followers' | 'private';
    createdAt: Date;
    deletedAt: Date | null;
}