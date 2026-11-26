import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import * as EditionsActions from './editions.action';
import { Router } from "@angular/router";
import { EditionsService } from "src/app/services/editions.service";
 
@Injectable()
export class EditionsEffects {
    loadEdition$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EditionsActions.loadEdition),
        switchMap((action) =>
        this.editionsService.getEditionById(action.id).pipe(
            map((edition) => EditionsActions.loadEditionSuccess({ edition })),
            catchError(() => of({ type: 'load edition error'}))
        )
        )
    ))

    constructor(private actions$: Actions, private editionsService: EditionsService, private router: Router) 
    {}
}