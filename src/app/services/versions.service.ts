import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { Version } from '../models/version';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {

  api: string = environment.api + "/Version"

  constructor(private httpClient: HttpClient) {

  }

  getAllVersions() {
    return this.httpClient.get<Version[]>(this.api + "/GetAllVersions")
  }

  getVersionById(id: number) {
    return this.httpClient.get<Version>(`${this.api}/GetVersion/${id}`);
  }

  getVersionsByBookId(bookId: number) {
    return this.httpClient.get<Version[]>(`${this.api}/GetVersionsByBookId/${bookId}`);
  }

  getContentByVersionId(id: number) {
    return this.httpClient.get<string>(`${this.api}/GetContentByVersionId/${id}`);
  }

  getPageContent(id: number, page: number, pageSize: number) {
    return this.httpClient.get(`${this.api}/GetPage?id=${id}&page=${page}&pageSize=${pageSize}`,
      {
        responseType: 'text'
      }
    );
  }

  uploadVersionPDF(file: File, userId: number, bookId: number, language: string) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post(`${environment.api}/File/UploadPdf/${userId}/${bookId}/${language}`, formData);
  }
}
