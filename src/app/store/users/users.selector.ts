import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const authState =
    createFeatureSelector<UsersState>('auth');

export const selectCurrentUser = createSelector(
    authState,
    (state) => state.user
);

export const selectIsLoggedIn = createSelector(
    authState,
    (state) => !!state.token
);

export const selectLoading = createSelector(
    authState,
    (state) => state.loading
);

export const selectAuthError = createSelector(
    authState,
    (state) => state.error
);