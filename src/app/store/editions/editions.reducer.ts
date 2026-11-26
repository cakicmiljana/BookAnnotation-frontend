import { createReducer, on } from "@ngrx/store";
import * as EditionsActions from "./editions.action";
import { initialState, adapter } from "./editions.state";

export const editionsReducer = createReducer(
  initialState,

  on(EditionsActions.loadEditionSuccess, (state, { edition }) =>
    adapter.upsertOne(edition, { ...state, selectedEdition: edition })
  ),

  on(EditionsActions.uploadEditionSuccess, (state, { edition }) =>
    adapter.addOne(edition, { ...state, selectedEdition: edition })
  )
);