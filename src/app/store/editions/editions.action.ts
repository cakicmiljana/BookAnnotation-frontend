import { createAction, props } from "@ngrx/store";
import { Edition } from "src/app/models/edition";

export const loadEdition = createAction("Load Edition", props<{ id: number }>());
export const loadEditionSuccess = createAction("Load Edition Success", props<{ edition: Edition }>());

export const uploadEdition = createAction("Upload Edition", props<{ edition: Edition }>());
export const uploadEditionSuccess = createAction("Upload Edition Success", props<{ edition: Edition }>());
export const uploadEditionFailure = createAction("Upload Edition Failure", props<{ error: string }>());