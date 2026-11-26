import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Work } from "src/app/models/work";

export interface WorksState extends EntityState<Work> {
}

export const adapter: EntityAdapter<Work> = createEntityAdapter<Work>({
    selectId: (work: Work) => work.id
});

export const initialState: WorksState = adapter.getInitialState();
