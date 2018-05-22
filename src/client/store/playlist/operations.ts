import { Dispatch } from 'react-redux';
import {
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  fetchPlaylistRequest,
  fetchPlaylistSuccess,
  fetchPlaylistFailure,
  setSinglePlaylist,
  removePlaylistRequest,
  removePlaylistSuccess,
  removePlaylistFailure,
} from '@client/store/playlist/actions';
import client from '@client/utils/client';
import { PlaylistInterface } from '@server/module/playlist/playlist.model';

export const fetchManyPlaylists = () => async (dispatch: Dispatch) => {
  dispatch(fetchPlaylistsRequest());
  try {
    const response = await client.get('/playlists');
    dispatch(fetchPlaylistsSuccess(response.data));
  } catch (err) {
    dispatch(fetchPlaylistsFailure());
  }
};

export const fetchSinglePlaylist = (id: number) => async (dispatch: Dispatch) => {
  dispatch(fetchPlaylistRequest(id));
  try {
    const response = await client.get(`/playlists/${id}`);
    dispatch(fetchPlaylistSuccess(response.data));
  } catch (err) {
    dispatch(fetchPlaylistFailure(id));
  }
};

export const setPlaylist = (playlist: PlaylistInterface) => (dispatch: Dispatch) => {
  dispatch(setSinglePlaylist(playlist));
};

export const removePlaylist = (id: number) => async (dispatch: Dispatch) => {
  dispatch(removePlaylistRequest(id));
  try {
    await client.delete(`/playlists/${id}`);
    dispatch(removePlaylistSuccess(id));
  } catch (err) {
    dispatch(removePlaylistFailure(id));
  }
};
