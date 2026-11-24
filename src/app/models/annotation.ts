export interface Annotation {
    id: number;
    editionId: number;
    userId: number;
    startOffset: number;
    endOffset: number;
    comment: string;
    tag: string | null;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface AnnotationInput {
    startOffset: number;
    endOffset: number;
    comment: string;
    tag: string | null;
    color: string;
}

export interface NotebookAnnotation extends Annotation {
    excerpt: string;
}
