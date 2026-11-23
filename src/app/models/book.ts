export interface Book {
    id: number;
    workId: number;
    title: string;
    author: string;
    country: string;
    language: string;
    pages: number;
    description: string;
    publicationYear: number;
    createdAt: Date;
    deletedAt: Date | null;
    pageSize: number;
    contentLength: number;
    uploadedByMe: boolean;
}