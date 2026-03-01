export interface Reaction {
    id: number;
    annotationId: number;
    userId: number;
    type: 'like' | 'love' | 'disagree';
}