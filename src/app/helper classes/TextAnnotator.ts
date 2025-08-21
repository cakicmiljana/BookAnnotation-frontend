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

      const open = `<span class="annotation" data-id="${ann.id ?? ''}" title="${ann.comment}" style="background-color: ${ann.color};">`;
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

  getOffset(root: Node, node: Node, offset: number): number {
    let chars = 0;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      const current = walker.currentNode;
      if (current === node) {
        return chars + offset;
      }
      chars += current.textContent?.length ?? 0;
    }

    return chars;
  }
}
