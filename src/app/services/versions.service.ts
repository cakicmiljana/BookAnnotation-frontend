import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Version } from '../models/version';
import { Observable, map } from 'rxjs';
import { Annotation } from '../models/annotation';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {

  private dataUrl = 'assets/mock-data.json';

  constructor(private httpClient: HttpClient) {}

  getAllVersions(): Observable<Version[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.versions)
    );
  }

  getVersionById(id: number): Observable<Version | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.versions.find((v: Version) => v.id === id))
    );
  }

  getVersionsByBookId(userId: number, bookId: number): Observable<Version[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.versions.filter(
          (v: Version) => v.bookId === bookId && v.userId === userId
        )
      )
    );
  }

  getVersionsByUserId(userId: number): Observable<Version[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.versions.filter((v: Version) => v.userId === userId)
      )
    );
  }

  getContentByVersionId(id: number): Observable<string | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.versions.find((v: Version) => v.id === id)?.content)
    );
  }

  getPageContent(id: number, page: number, pageSize: number): Observable<string> {
    return this.getContentByVersionId(id).pipe(
      map(content => {
        if (!content) return '';
        const start = page * pageSize;
        const end = start + pageSize;
        return content.substring(start, end);
      })
    );
  }

  getAnnotationsByVersionId(versionId: number): Observable<Annotation[]> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.annotations.filter(
          (a: Annotation) => a.bookId === versionId
        )
      )
    );
  }

  getNoteByVersionId(versionId: number): Observable<Note | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data =>
        data.notes.find((n: Note) => n.bookId === versionId)
      )
    );
  }

  // Mock-only actions
  addAnnotation(versionId: any, userId: any, start: any, end: any, comment: string, tag: string, color: string) {
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

  addNote(versionId: number, userId: number, noteContent: string) {
    console.warn('Mock mode: addNote does not persist.');
    return new Observable(observer => observer.next(true));
  }

  updateNote(id: number, noteContent: string) {
    console.warn('Mock mode: updateNote does not persist.');
    return new Observable(observer => observer.next(true));
  }
}