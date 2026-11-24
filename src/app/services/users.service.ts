import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ReadingPreferences } from '../models/reading-preferences';
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
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message =
            error.status === 401 ? 'Invalid username or password'
            : error.status === 0 ? 'Cannot reach the server. Is the backend running?'
            : error.error?.message ?? 'Login failed';
          return throwError(() => new Error(Array.isArray(message) ? message.join(', ') : message));
        })
      );
  }

  /** The currently authenticated user (requires a token). */
  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/me`);
  }

  getPreferences(): Observable<ReadingPreferences> {
    return this.httpClient.get<ReadingPreferences>(`${environment.apiUrl}/me/preferences`);
  }

  savePreferences(preferences: ReadingPreferences): Observable<ReadingPreferences> {
    return this.httpClient.put<ReadingPreferences>(`${environment.apiUrl}/me/preferences`, preferences);
  }

  updateUser(id: number, username: string, email: string, password: string) {
    console.warn('Mock mode: updateUser does not persist changes.');
    return this.getUserById(id);
  }
}