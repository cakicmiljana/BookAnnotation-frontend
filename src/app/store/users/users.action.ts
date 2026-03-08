import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const login = createAction('Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('Login Success', props<{ user: User; token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('Logout Success');