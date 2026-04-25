import { createAction, props } from "@ngrx/store";
import { Annotation } from "src/app/models/annotation";

export const loadAnnotations = createAction("Load Annotations", props<{ bookId: number, userId: number }>());
export const loadAnnotationsSuccess = createAction("Load Annotations Success", props<{ annotations: Annotation[] }>());

export const addAnnotation = createAction("Add Annotation",props<{ annotation: Annotation }>());
export const addAnnotationSuccess = createAction("Add Annotation Success", props<{ annotation: Annotation }>());
export const addAnnotationFailure = createAction("Add Annotation Failure", props<{ error: string }>());

export const updateAnnotation = createAction("Update Annotation", props<{ annotation: Annotation }>());
export const updateAnnotationSuccess = createAction("Update Annotation Success", props<{ annotation: Annotation }>());
export const updateAnnotationFailure = createAction("Update Annotation Failure", props<{ error: string }>());

export const deleteAnnotation = createAction("Delete Annotation", props<{ id: number }>());
export const deleteAnnotationSuccess = createAction("Delete Annotation Success", props<{ id: number }>());
export const deleteAnnotationFailure = createAction("Delete Annotation Failure", props<{ error: string }>());