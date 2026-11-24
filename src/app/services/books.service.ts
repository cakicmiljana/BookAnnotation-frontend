import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Annotation, AnnotationInput, NotebookAnnotation } from '../models/annotation';
import { Note } from '../models/note';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private dataUrl = 'assets/mock-data.json';

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
  
getAnnotationsByBookId(bookId: number, userId: number): Observable<Annotation[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.annotations.filter(
          (a: Annotation) => a.editionId === bookId && a.userId === userId
          )
        )
      );
    }
  
    getNote(bookId: number, userId: number): Observable<Note | undefined> {
      return this.httpClient.get<any>(this.dataUrl).pipe(
        map(data =>
          data.notes.find((n: Note) => n.editionId === bookId && n.userId === userId)
        )
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

    addNote(bookId: number, userId: number, noteContent: string) {
      console.warn('Mock mode: addNote does not persist.');
      return new Observable(observer => observer.next(true));
    }
  
    updateNote(id: number, noteContent: string) {
      console.warn('Mock mode: updateNote does not persist.');
      return new Observable(observer => observer.next(true));
    }
}