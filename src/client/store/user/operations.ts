import { Dispatch } from 'react-redux';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  logout,
} from '@app/client/store/user/actions';
import client from '@app/client/utils/client';

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await client.get('/users/me');
    dispatch(fetchUserSuccess(response.data));
  } catch (err) {
    dispatch(fetchUserFailure());
  }
};

export const logoutUser = () => (dispatch: Dispatch) => dispatch(logout());
