import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AnnotationsActions from "./annotations.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { EditionsService } from "src/app/services/editions.service";

@Injectable()
export class AnnotationsEffects {

  loadAnnotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.loadAnnotations),
      switchMap(({ editionId }) =>
        this.editionsService.getAnnotations(editionId).pipe(
          map(annotations => AnnotationsActions.loadAnnotationsSuccess({ annotations })),
          catchError(error => of(AnnotationsActions.loadAnnotationsFailure({ error: this.errorMessage(error) })))
        )
      )
    )
  );

  addAnnotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.addAnnotation),
      mergeMap(({ editionId, annotation }) =>
        this.editionsService.addAnnotation(editionId, annotation).pipe(
          map(added => AnnotationsActions.addAnnotationSuccess({ annotation: added })),
          catchError(error => of(AnnotationsActions.addAnnotationFailure({ error: this.errorMessage(error) })))
        )
      )
    )
  );

  updateAnnotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.updateAnnotation),
      mergeMap(({ id, annotation }) =>
        this.editionsService.updateAnnotation(id, annotation).pipe(
          map(updated => AnnotationsActions.updateAnnotationSuccess({ annotation: updated })),
          catchError(error => of(AnnotationsActions.updateAnnotationFailure({ error: this.errorMessage(error) })))
        )
      )
    )
  );

  deleteAnnotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.deleteAnnotation),
      mergeMap(({ id }) =>
        this.editionsService.deleteAnnotation(id).pipe(
          map(() => AnnotationsActions.deleteAnnotationSuccess({ id })),
          catchError(error => of(AnnotationsActions.deleteAnnotationFailure({ error: this.errorMessage(error) })))
        )
      )
    )
  );

  private errorMessage(error: any): string {
    const message = error?.error?.message ?? 'Something went wrong';
    if (Array.isArray(message)) {
      return message.join(', ');
    }
    return message;
  }

  constructor(
    private actions$: Actions,
    private editionsService: EditionsService
  ) {}
}
