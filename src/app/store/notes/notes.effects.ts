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
      switchMap((action) =>
        this.booksService.getNote(action.bookId, action.userId).pipe(
          map(note => NotesActions.getNoteSuccess({ note })),
          catchError((error) => of(NotesActions.getNoteFailure({ error: error.message })))
        )
      )
    )
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createNoteSuccess),
      switchMap((action) =>
        this.booksService.addNote(action.note.bookId, action.note.userId, action.note.content).pipe(
          map(() => NotesActions.createNoteSuccess({ note: action.note })),
          catchError((error) => of(NotesActions.createNoteFailure({ error: error.message })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteSuccess),
      switchMap((action) =>
        this.booksService.updateNote(action.note.id, action.note.content).pipe(
          map(() => NotesActions.updateNoteSuccess({ note: action.note })),
          catchError((error) => of(NotesActions.updateNoteFailure({ error: error.message })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      switchMap((action) =>
        of(NotesActions.deleteNoteSuccess({ id: action.id })).pipe(
          catchError((error) => of(NotesActions.deleteNoteFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private booksService: BooksService) {}
}
