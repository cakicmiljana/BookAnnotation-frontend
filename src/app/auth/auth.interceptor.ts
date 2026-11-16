import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../store/app.state';
import { logout } from '../store/users/users.action';
import { authState } from '../store/users/users.selector';

/**
 * Attaches the JWT from the store to every request sent to the backend API,
 * and logs the user out when the backend rejects the token (401).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const store = inject(Store<AppState>);

  return store.select(authState).pipe(
    take(1),
    switchMap(({ token }) => {
      const request = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

      return next(request).pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && token) {
            store.dispatch(logout());
          }
          return throwError(() => error);
        })
      );
    })
  );
};
