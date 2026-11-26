import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import * as WorksActions from './works.action';
import { BooksService } from "src/app/services/books.service";

@Injectable()
export class WorksEffects {
    loadWorks$ = createEffect(() =>
    this.actions$.pipe(
        ofType(WorksActions.loadWorks),
        switchMap(() =>
        this.booksService.getAllWorks().pipe(
            map((works) => WorksActions.loadWorksSuccess({ works })),
            catchError(() => of({ type: 'load works error'}))
        )
        )
    ));

    constructor(private actions$: Actions, private booksService: BooksService)
    {}
}
