import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import * as NotesActions from "./notes.actions";
import { BooksService } from "src/app/services/books.service";

@Injectable()
export class NotesEffects {
  getNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.getNote),
      switchMap(({ editionId }) =>
        this.booksService.getNote(editionId).pipe(
          map(note => NotesActions.getNoteSuccess({ note })),
          catchError(() => of(NotesActions.getNoteFailure({ error: 'Could not load the note' })))
        )
      )
    )
  );

  saveNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.saveNote),
      switchMap(({ editionId, content }) =>
        this.booksService.saveNote(editionId, content).pipe(
          map(note => NotesActions.saveNoteSuccess({ note })),
          catchError(() => of(NotesActions.saveNoteFailure({ error: 'Could not save the note' })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private booksService: BooksService) {}
}
