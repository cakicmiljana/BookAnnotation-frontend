import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import * as UsersActions from './users.action';
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
      tap(() => this.router.navigate(['/all-books']))
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router
  ) {}
}