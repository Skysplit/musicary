import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT,
} from '@app/client/store/user/actionTypes';
import { UserInterface } from '@client/store/user';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST as typeof FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (payload: UserInterface) => ({
  payload,
  type: FETCH_USER_SUCCESS as typeof FETCH_USER_SUCCESS,
});

export const fetchUserFailure = () => ({
  type: FETCH_USER_FAILURE as typeof FETCH_USER_FAILURE,
});

export const logout = () => ({
  type: LOGOUT as typeof LOGOUT,
});
