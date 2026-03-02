import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
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
}