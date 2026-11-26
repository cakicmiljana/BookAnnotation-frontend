export interface Work {
    id: number;
    title: string;
    author: string;
    description: string | null;
    country: string | null;
    originalLanguage: string | null;
    publicationYear: number | null;
    editionCount: number;
}
