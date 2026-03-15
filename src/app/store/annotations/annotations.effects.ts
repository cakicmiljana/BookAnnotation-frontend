import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AnnotationsActions from "./annotations.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { BooksService } from "src/app/services/books.service";
import { Annotation } from "src/app/models/annotation";

@Injectable()
export class AnnotationsEffects {

  loadAnnotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.loadAnnotations),
      switchMap(({ bookId, userId }) =>
        this.annotationsService.getAnnotationsByBookId(bookId, userId).pipe(
          map(annotations =>
            AnnotationsActions.loadAnnotationsSuccess({ annotations })
          ),
          catchError(() => of({ type: 'load annotations error'}))
        )
      )
    )
  );

  addAnnotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.addAnnotation),
        switchMap(({ annotation }) =>
            this.annotationsService.addAnnotation(annotation as Annotation).pipe(
            map(added => AnnotationsActions.addAnnotationSuccess({ annotation: added as Annotation })),
            catchError(() => of({ type: 'add annotation error'}))
            )
        )
    )
  );

  updateAnnotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.updateAnnotation),
      switchMap(({ annotation }) =>
        this.annotationsService.updateAnnotation(annotation).pipe(
          map(updated =>
            AnnotationsActions.updateAnnotationSuccess({ annotation: updated as Annotation })
          ),
          catchError(error =>
            of(AnnotationsActions.updateAnnotationFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private annotationsService: BooksService
  ) {}
}