export interface FeedItem {
  id: number;
  type: 'annotation' | 'note' | 'book';
  userId: number;
  bookId: number;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  bookTitle?: string;
  bookAuthor?: string;
}