import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import * as BooksActions from './books.action';
import { Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
 
@Injectable()
export class BooksEffects {
    loadBooks$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BooksActions.loadBooks),
        switchMap(() =>
        this.booksService.getAllBooks().pipe(
            map((books) => BooksActions.loadBooksSuccess({ books })),
            catchError(() => of({ type: 'load books error'}))
        )
        )
    ));

    loadBook$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BooksActions.loadBook),
        switchMap((action) =>
        this.booksService.getBookById(action.id).pipe(
            map((book) => BooksActions.loadBookSuccess({ book })),
            catchError(() => of({ type: 'load book error'}))
        )
        )
    ))

    constructor(private actions$: Actions, private booksService: BooksService, private router: Router) 
    {}
}