import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '@app/client/store/user/actions';
import { UserInterface } from '@app/server/module/user/user.model';

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
