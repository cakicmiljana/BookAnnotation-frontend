import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AnnotationsState } from "./annotations.state";

export const selectAnnotationsState =
  createFeatureSelector<AnnotationsState>("annotations");

export const selectAnnotations = createSelector(
  selectAnnotationsState,
  (state) => state.annotations
);

export const selectAnnotationsError = createSelector(
  selectAnnotationsState,
  (state) => state.error
);

export const selectSelectedAnnotation = createSelector(
  selectAnnotationsState,
  (state) => state.selectedAnnotation
);