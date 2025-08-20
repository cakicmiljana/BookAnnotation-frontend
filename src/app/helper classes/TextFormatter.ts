export class TextFormatter {
  private pages: string[] = [];

  constructor(
    private fullText: string,
    private pageSize: number = 2000
  ) {
    this.paginate();
  }

  private paginate() {  
    const paragraphs = this.fullText.split(/\n\s*\n/);

    let currentPage = '';
    for (const para of paragraphs) {
      const formattedPara = para.trim() + '\n\n';

      if ((currentPage + formattedPara).length > this.pageSize) {
        this.pages.push(currentPage.trim());
        currentPage = formattedPara;
      } else {
        currentPage += formattedPara;
      }
    }

    if (currentPage.length > 0) {
      this.pages.push(currentPage.trim());
    }
  }

  getPageCount(): number {
    return this.pages.length;
  }

  getPage(index: number): string {
    if (index < 0 || index >= this.pages.length) {
      return '';
    }
    return this.pages[index];
  }
}
