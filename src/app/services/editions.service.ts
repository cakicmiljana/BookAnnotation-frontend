import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edition } from '../models/edition';
import { Annotation, AnnotationInput, NotebookAnnotation } from '../models/annotation';
import { Bookmark } from '../models/bookmark';
import { LibraryItem } from '../models/library-item';
import { Note } from '../models/note';
import { Work } from '../models/work';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditionsService {

  constructor(private httpClient: HttpClient) {}

  getAllEditions(): Observable<Edition[]> {
    return this.httpClient.get<Edition[]>(`${environment.apiUrl}/editions`);
  }

  getEditionById(id: number): Observable<Edition> {
    return this.httpClient.get<Edition>(`${environment.apiUrl}/editions/${id}`);
  }

  getEditionContent(id: number): Observable<string> {
    return this.httpClient
      .get<{ content: string }>(`${environment.apiUrl}/editions/${id}/content`)
      .pipe(map(response => response.content));
  }

  getAllWorks(): Observable<Work[]> {
    return this.httpClient.get<Work[]>(`${environment.apiUrl}/works`);
  }

  getEditionsOfWork(workId: number): Observable<Edition[]> {
    return this.httpClient.get<Edition[]>(`${environment.apiUrl}/works/${workId}/editions`);
  }
  
  getPageContent(id: number, page: number, pageSize: number): Observable<string> {
    return this.getEditionContent(id).pipe(
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

  uploadEdition(formData: FormData): Observable<Edition> {
    return this.httpClient.post<Edition>(`${environment.apiUrl}/editions`, formData);
  }

  getLibrary(): Observable<LibraryItem[]> {
    return this.httpClient.get<LibraryItem[]>(`${environment.apiUrl}/me/library`);
  }

  addToLibrary(editionId: number): Observable<LibraryItem> {
    return this.httpClient.put<LibraryItem>(`${environment.apiUrl}/me/library/${editionId}`, {});
  }

  removeFromLibrary(editionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/me/library/${editionId}`);
  }

  saveReadingPosition(editionId: number, offset: number): Observable<LibraryItem> {
    return this.httpClient.put<LibraryItem>(`${environment.apiUrl}/me/library/${editionId}/position`, { offset });
  }
}
