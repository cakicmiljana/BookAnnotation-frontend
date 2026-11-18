import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, of, switchMap, take, tap } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { tokenStorage } from "src/app/auth/token-storage";
import * as UsersActions from './users.action';
import { authState } from './users.selector';
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.login),
      switchMap(({ username: email, password }) =>
        this.usersService.login(email, password).pipe(
          map((response) =>
            UsersActions.loginSuccess({
              user: response.user,
              token: response.token,
            })
          ),
          catchError((error) =>
            of(UsersActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loginSuccess),
      tap(({ token }) => {
        tokenStorage.set(token);
        this.router.navigate(['/all-books']);
      })
    ),
    { dispatch: false }
  );

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      take(1),
      switchMap(() => this.store.select(authState).pipe(take(1))),
      filter(({ token }) => !!token),
      switchMap(() =>
        this.usersService.getCurrentUser().pipe(
          map((user) => UsersActions.sessionRestored({ user })),
          // Invalid or revoked token, or the user no longer exists.
          catchError(() => of(UsersActions.logout()))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.logout),
      tap(() => {
        tokenStorage.clear();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private usersService: UsersService,
    private router: Router
  ) {}
}
