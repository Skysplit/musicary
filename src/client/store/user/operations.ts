import { Dispatch } from 'react-redux';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from '@app/client/store/user/actionTypes';
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
