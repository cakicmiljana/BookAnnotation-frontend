export interface WorkSummary {
    id: number;
    title: string;
    author: string;
    description: string | null;
    country: string | null;
    originalLanguage: string | null;
    publicationYear: number | null;
}

export interface Work extends WorkSummary {
    editionCount: number;
}
