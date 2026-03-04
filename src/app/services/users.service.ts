import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { LoginResponse } from '../dtos/LoginResponse';

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

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.get<any>(this.dataUrl).pipe(
      map(data => {
        const user: User | undefined = data.users.find(
          (u: User) => u.username === username && u.password === password
        );

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const response: LoginResponse = {
          user,
          token: 'mock-jwt-token-12345'
        };

        return response;
      })
    );
  }

  // login(username: string, password: string): Observable<LoginResponse> {
  //   return this.httpClient.get<any>(this.dataUrl).pipe(
  //     map(data => data.users.find(
  //       (u: User) => u.username === username && u.password === password
  //     ))
  //   );
  // }

  updateUser(id: number, username: string, email: string, password: string) {
    console.warn('Mock mode: updateUser does not persist changes.');
    return this.getUserById(id);
  }
}