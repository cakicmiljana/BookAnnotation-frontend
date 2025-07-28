import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  api: string = environment.api + "/Book"

  constructor(private httpClient: HttpClient) {

  }

  getAllBooks() {
    return this.httpClient.get<Book[]>(this.api + "/GetAllBooks")
  }

  getBookById(id: number) {
    return this.httpClient.get<Book>(`${this.api}/GetBook/${id}`);
  }
}
