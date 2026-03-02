export interface Book {
    id: number;
    title: string;
    author: string;
    country: string;
    language: string;
    pages: number;
    description: string;
    publicationYear: number;
    createdAt: Date;
    deletedAt: Date | null;
    content: string;
    pageSize: number;
}