import { Annotation } from 'src/app/models/annotation';

export class TextAnnotator {
  annotateText(text: string, annotations: Annotation[] = [], pageNumber: number, pageSize: number): string {
    if (!text || !annotations?.length) return text ?? '';

    const allAnns = [...annotations].sort((a, b) => b.startOffset - a.startOffset);

    const anns = allAnns.filter(
      a => a.endOffset > pageNumber * pageSize && a.startOffset < (pageNumber + 1) * pageSize
    );

    const pageStart = pageNumber * pageSize;
    let result = text;

    for (const ann of anns) {
      const start = Math.max(0, ann.startOffset - pageStart);
      const end = Math.max(0, ann.endOffset - pageStart);

      if (start >= end) continue;

      const open = `<span class="annotation" data-id="${ann.id ?? ''}">`;
      const close = `</span>`;

      result =
        result.slice(0, start) +
        open +
        result.slice(start, end) +
        close +
        result.slice(end);
    }

    return result;
  }
}
