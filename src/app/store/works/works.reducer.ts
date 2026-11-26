import { createReducer, on } from "@ngrx/store";
import * as WorksActions from "./works.action";
import { initialState, adapter } from "./works.state";

export const worksReducer = createReducer(
  initialState,

  on(WorksActions.loadWorksSuccess, (state, { works }) =>
    adapter.setAll(works, state)
  )
);
