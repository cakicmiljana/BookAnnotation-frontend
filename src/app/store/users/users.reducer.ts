import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.action';
import { UsersState } from './users.state';

export const initialState: UsersState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const userReducer = createReducer(
    initialState,

    on(UsersActions.login, (state) => {
        return { ...state,
            loading: true,
            error: null}
    }),

    on(UsersActions.loginSuccess, (state, { user, token }) => {
        return {...state,
            loading: false,
            user,
            token}
    }),

    on(UsersActions.loginFailure, (state, { error }) => {
        return {...state,
            loading: false,
            error}
    }),

    on(UsersActions.logout, () => {
        return initialState
    })
);