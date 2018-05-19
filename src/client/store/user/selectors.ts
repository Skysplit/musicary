import { State } from '@client/store';

export const getIsUserLoading = (state: State) => state.user.isLoading;

export const getUser = (state: State) => state.user.user;
