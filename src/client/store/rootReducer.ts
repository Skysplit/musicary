
import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import track from './track';

export default combineReducers({
  user,
  playlist,
  track,
});
