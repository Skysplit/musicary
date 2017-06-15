import { Api } from '../../utils/api';
import { SET_USER } from './constants';

export const setUser = payload => ({
  type: SET_USER,
  payload,
});

export const getUser = () => dispatch => Api.get('/api/me', {
  onSuccess: response => dispatch(setUser(response.data.data)),
  onError: () => dispatch(setUser({})),
});

export const login = (email, password) => () => Api.post('/api/auth/login', {
  data: { email, password },
  onSuccess: response => console.log(response),
  onError: response => console.error(response),
});

export const logout = () => dispatch => Api.post('/api/auth/logout', {
  onSuccess: () => dispatch(setUser({})),
  onError: response => console.error(response),
});
