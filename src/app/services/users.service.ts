import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dataUrl = 'assets/mock-data.json';

  constructor(private httpClient: HttpClient) {}

  getUserById(id: number): Observable<User | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.users.find((u: User) => u.id === id))
    );
  }

  login(username: string, password: string): Observable<User | undefined> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => data.users.find(
        (u: User) => u.username === username && u.password === password
      ))
    );
  }

  updateUser(id: number, username: string, email: string, password: string) {
    console.warn('Mock mode: updateUser does not persist changes.');
    return this.getUserById(id);
  }
}