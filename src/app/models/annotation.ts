export interface Annotation {
    id: number;
    editionId: number;
    userId: number;
    startOffset: number;
    endOffset: number;
    comment: string;
    tag: string;
    color: string;
    createdAt: Date;
    deletedAt: Date | null;
}
