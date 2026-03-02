import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Annotation } from '../models/annotation';
import { Note } from '../models/note';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private dataUrl = 'assets/mock-data.json';

  constructor(private httpClient: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.books)
    );
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.books.find((b: Book) => b.id === id))
    );
  }
  
  // retrieve the full book text
  getBookContent(id: number): Observable<string | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.books.find((b: Book) => b.id === id)?.content)
    );
  }
  
  getPageContent(id: number, page: number, pageSize: number): Observable<string> {
    return this.getBookContent(id).pipe(
      map(content => {
        if (!content) return '';
        const start = page * pageSize;
        const end = start + pageSize;
        return content.substring(start, end);
      })
    );
  }
  
getAnnotationsByBookId(bookId: number): Observable<Annotation[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.annotations.filter(
          (a: Annotation) => a.bookId === bookId
          )
        )
      );
    }
  
    getNote(bookId: number, userId: number): Observable<Note | undefined> {
      return this.httpClient.get<any>(this.dataUrl).pipe(
        map(data =>
          data.notes.find((n: Note) => n.bookId === bookId && n.userId === userId)
        )
      );
    }
  
    // Mock-only actions
    addAnnotation(bookId: any, userId: any, start: any, end: any, comment: string, tag: string, color: string) {
      console.warn('Mock mode: addAnnotation does not persist.');
      return new Observable(observer => observer.next(true));
    }
  
    updateAnnotation(id: any, start: any, end: any, comment: string, tag: string, color: string) {
      console.warn('Mock mode: updateAnnotation does not persist.');
      return new Observable(observer => observer.next(true));
    }
  
    deleteAnnotation(id: any) {
      console.warn('Mock mode: deleteAnnotation does not persist.');
      return new Observable(observer => observer.next(true));
    }
  
    addNote(bookId: number, userId: number, noteContent: string) {
      console.warn('Mock mode: addNote does not persist.');
      return new Observable(observer => observer.next(true));
    }
  
    updateNote(id: number, noteContent: string) {
      console.warn('Mock mode: updateNote does not persist.');
      return new Observable(observer => observer.next(true));
    }
}