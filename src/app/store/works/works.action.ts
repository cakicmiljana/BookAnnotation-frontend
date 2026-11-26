import { createAction, props } from "@ngrx/store";
import { Work } from "src/app/models/work";

export const loadWorks = createAction("Load Works");
export const loadWorksSuccess = createAction("Load Works Success", props<{ works: Work[] }>());
