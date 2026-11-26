import { Edition } from './edition';

export interface LibraryItem extends Edition {
    addedAt: string;
    lastOpenedAt: string | null;
    lastPosition: number;
}
