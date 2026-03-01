export interface AnnotationComment {
    id: number;
    annotationId: number;
    userId: number;
    content: string;
    createdAt: Date;
    deletedAt: Date | null;
}