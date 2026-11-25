import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ReadingPreferences } from '../models/reading-preferences';
import { LoginResponse } from '../dtos/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

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

  updateProfile(username: string): Observable<User> {
    return this.httpClient.patch<User>(`${environment.apiUrl}/me`, { username });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/me/password`, { currentPassword, newPassword });
  }
}