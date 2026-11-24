import { createReducer, on } from "@ngrx/store";
import * as AnnotationsActions from "./annotations.actions";
import { initialAnnotationsState } from "./annotations.state";

export const annotationsReducer = createReducer(
  initialAnnotationsState,

  on(AnnotationsActions.loadAnnotations, (state) => ({
    ...state,
    annotations: [],
    loading: true,
    error: null
  })),
  on(AnnotationsActions.loadAnnotationsSuccess, (state, { annotations }) => ({
    ...state,
    annotations,
    loading: false
  })),
  on(AnnotationsActions.addAnnotationSuccess, (state, { annotation }) => ({
    ...state,
    annotations: [...state.annotations, annotation],
    error: null
  })),
  on(AnnotationsActions.updateAnnotationSuccess, (state, { annotation }) => ({
    ...state,
    annotations: state.annotations.map(a =>
      a.id === annotation.id ? annotation : a
    ),
    error: null
  })),
  on(AnnotationsActions.deleteAnnotationSuccess, (state, { id }) => ({
    ...state,
    annotations: state.annotations.filter(a => a.id !== id),
    error: null
  })),
  on(
    AnnotationsActions.loadAnnotationsFailure,
    AnnotationsActions.addAnnotationFailure,
    AnnotationsActions.updateAnnotationFailure,
    AnnotationsActions.deleteAnnotationFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  )
);
