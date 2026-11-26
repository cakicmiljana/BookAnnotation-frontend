import { WorkSummary } from './work';

export interface Edition {
    id: number;
    workId: number;
    work: WorkSummary;
    language: string;
    isbn: string | null;
    pages: number | null;
    pageSize: number;
    contentLength: number;
    uploadedByMe: boolean;
    createdAt: string;
}
