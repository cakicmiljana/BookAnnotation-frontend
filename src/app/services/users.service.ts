import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api: string = environment.api + "/User";

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number) {
    return this.httpClient.get<User>(`${this.api}/GetUser/${id}`);
  }

  updateUser(id: number, username: string, email: string, password: string) {
    return this.httpClient.put(`${this.api}/UpdateUser/${id}/${username}/${email}/${password}`, {});
  }

  login(username: string, password: string) {
    return this.httpClient.get<User>(`${this.api}/Login/${username}/${password}`);
  }
}
