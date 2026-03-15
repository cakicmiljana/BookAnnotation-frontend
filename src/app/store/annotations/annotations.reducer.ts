import { createReducer, on } from "@ngrx/store";
import * as AnnotationsActions from "./annotations.actions";
import { initialAnnotationsState } from "./annotations.state";

export const annotationsReducer = createReducer(
  initialAnnotationsState,

  on(AnnotationsActions.loadAnnotations, (state) => ({
    ...state,
    loading: true
  })),
  on(AnnotationsActions.loadAnnotationsSuccess, (state, { annotations }) => ({
    ...state,
    annotations,
    loading: false
  })),
  on(AnnotationsActions.addAnnotationSuccess, (state, { annotation }) => ({
    ...state,
    annotations: [...state.annotations, annotation]
  })),
  on(AnnotationsActions.updateAnnotationSuccess, (state, { annotation }) => ({
    ...state,
    annotations: state.annotations.map(a =>
      a.id === annotation.id ? annotation : a
    )
  }))
);