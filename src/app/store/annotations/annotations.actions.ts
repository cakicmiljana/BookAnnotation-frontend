import { createAction, props } from "@ngrx/store";
import { Annotation, AnnotationInput } from "src/app/models/annotation";

export const loadAnnotations = createAction("Load Annotations", props<{ editionId: number }>());
export const loadAnnotationsSuccess = createAction("Load Annotations Success", props<{ annotations: Annotation[] }>());
export const loadAnnotationsFailure = createAction("Load Annotations Failure", props<{ error: string }>());

export const addAnnotation = createAction("Add Annotation", props<{ editionId: number; annotation: AnnotationInput }>());
export const addAnnotationSuccess = createAction("Add Annotation Success", props<{ annotation: Annotation }>());
export const addAnnotationFailure = createAction("Add Annotation Failure", props<{ error: string }>());

export const updateAnnotation = createAction("Update Annotation", props<{ id: number; annotation: AnnotationInput }>());
export const updateAnnotationSuccess = createAction("Update Annotation Success", props<{ annotation: Annotation }>());
export const updateAnnotationFailure = createAction("Update Annotation Failure", props<{ error: string }>());

export const deleteAnnotation = createAction("Delete Annotation", props<{ id: number }>());
export const deleteAnnotationSuccess = createAction("Delete Annotation Success", props<{ id: number }>());
export const deleteAnnotationFailure = createAction("Delete Annotation Failure", props<{ error: string }>());
