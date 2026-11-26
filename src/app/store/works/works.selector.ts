import { createFeatureSelector } from "@ngrx/store";
import { WorksState, adapter } from "./works.state";

export const selectWorksState =
    createFeatureSelector<WorksState>("works");

export const {
    selectAll: selectWorks
} = adapter.getSelectors(selectWorksState);
