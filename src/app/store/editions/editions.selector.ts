import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EditionsState, adapter } from "./editions.state";

export const selectEditionsState =
    createFeatureSelector<EditionsState>("editions");

// Entity adapter selectors
export const {
    selectIds: selectEditionIds,
    selectEntities: selectEditionEntities,
    selectAll: selectAllEditions,
    selectTotal: selectTotalEditions
} = adapter.getSelectors(selectEditionsState);

export const selectEditions = selectAllEditions;

export const selectSelectedEdition = createSelector(
    selectEditionsState,
    (state) => state.selectedEdition
);

// Selector to get an edition by ID
export const selectEditionById = (id: number) =>
    createSelector(
        selectEditionEntities,
        (entities) => entities[id]
    );