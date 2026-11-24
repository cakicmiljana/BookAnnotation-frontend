import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Annotation, AnnotationInput, NotebookAnnotation } from '../models/annotation';
import { Bookmark } from '../models/bookmark';
import { Note } from '../models/note';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/editions`);
  }

  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${environment.apiUrl}/editions/${id}`);
  }

  getBookContent(id: number): Observable<string> {
    return this.httpClient
      .get<{ content: string }>(`${environment.apiUrl}/editions/${id}/content`)
      .pipe(map(response => response.content));
  }

  getEditionsOfWork(workId: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/works/${workId}/editions`);
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
  
  getAnnotations(editionId: number): Observable<Annotation[]> {
    return this.httpClient.get<Annotation[]>(`${environment.apiUrl}/editions/${editionId}/annotations`);
  }

  addAnnotation(editionId: number, annotation: AnnotationInput): Observable<Annotation> {
    return this.httpClient.post<Annotation>(`${environment.apiUrl}/editions/${editionId}/annotations`, annotation);
  }

  updateAnnotation(id: number, annotation: AnnotationInput): Observable<Annotation> {
    return this.httpClient.patch<Annotation>(`${environment.apiUrl}/annotations/${id}`, annotation);
  }

  deleteAnnotation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/annotations/${id}`);
  }

  getMyAnnotations(): Observable<NotebookAnnotation[]> {
    return this.httpClient.get<NotebookAnnotation[]>(`${environment.apiUrl}/me/annotations`);
  }

  getNote(editionId: number): Observable<Note | null> {
    return this.httpClient.get<Note | null>(`${environment.apiUrl}/editions/${editionId}/note`);
  }

  saveNote(editionId: number, content: string): Observable<Note> {
    return this.httpClient.put<Note>(`${environment.apiUrl}/editions/${editionId}/note`, { content });
  }

  getMyNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${environment.apiUrl}/me/notes`);
  }

  getBookmarks(editionId: number): Observable<Bookmark[]> {
    return this.httpClient.get<Bookmark[]>(`${environment.apiUrl}/editions/${editionId}/bookmarks`);
  }

  addBookmark(editionId: number, offset: number): Observable<Bookmark> {
    return this.httpClient.post<Bookmark>(`${environment.apiUrl}/editions/${editionId}/bookmarks`, { offset });
  }

  deleteBookmark(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/bookmarks/${id}`);
  }
}
