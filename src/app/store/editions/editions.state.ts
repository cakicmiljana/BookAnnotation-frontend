import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Edition } from "src/app/models/edition";

export interface EditionsState extends EntityState<Edition> {
    selectedEdition: Edition | null;
}

export const adapter: EntityAdapter<Edition> = createEntityAdapter<Edition>({
    selectId: (edition: Edition) => edition.id
});

export const initialState: EditionsState = adapter.getInitialState({
    selectedEdition: null
});