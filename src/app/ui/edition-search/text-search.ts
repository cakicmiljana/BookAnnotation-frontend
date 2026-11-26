export interface TextMatch {
    offset: number;
    length: number;
}

/** Literal, case-insensitive matches with offsets into the original source text. */
export function findTextMatches(text: string, query: string): TextMatch[] {
    if (!query.trim()) return [];
    const literal = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return Array.from(text.matchAll(new RegExp(literal, 'giu')), match => ({
        offset: match.index!,
        length: match[0].length
    }));
}
