import { Annotation } from "src/app/models/annotation";

export interface AnnotationsState {
  annotations: Annotation[];
  selectedAnnotation: Annotation | null;
}

export const initialAnnotationsState: AnnotationsState = {
  annotations: [],
  selectedAnnotation: null
};