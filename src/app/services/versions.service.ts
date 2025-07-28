import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { Version } from '../models/version';

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
}
