import { findTextMatches } from './text-search';
describe('findTextMatches', () => {
    it('finds every occurrence across the full source text, preserving offsets', () => {
        expect(findTextMatches('Book one\n\n' + 'x'.repeat(400) + 'BOOK two', 'book'))
            .toEqual([{ offset: 0, length: 4 }, { offset: 410, length: 4 }]);
    });
    it('treats regex punctuation as literal text', () => {
        expect(findTextMatches('a+b [note] aab', 'a+b')).toEqual([{ offset: 0, length: 3 }]);
        expect(findTextMatches('a+b [note] aab', '[note]')).toEqual([{ offset: 4, length: 6 }]);
    });
    it('retains source offsets after characters whose lowercase form changes length', () => {
        expect(findTextMatches('İ book BOOK', 'book')).toEqual([{ offset: 2, length: 4 }, { offset: 7, length: 4 }]);
    });
    it('returns no matches for empty, whitespace-only, or absent text', () => {
        expect(findTextMatches('book', '')).toEqual([]);
        expect(findTextMatches('book', '  ')).toEqual([]);
        expect(findTextMatches('book', 'missing')).toEqual([]);
    });
});
