import {
  FETCH_MANY_PLAYLISTS_REQUEST,
  FETCH_MANY_PLAYLISTS_SUCCESS,
  FETCH_SINGLE_PLAYLIST_REQUEST,
  FETCH_MANY_PLAYLISTS_FAILURE,
  FETCH_SINGLE_PLAYLIST_FAILURE,
  FETCH_SINGLE_PLAYLIST_SUCCESS,
  SET_PLAYLIST,
  REMOVE_PLAYLIST_REQUEST,
  REMOVE_PLAYLIST_FAILURE,
  REMOVE_PLAYLIST_SUCCESS,
  REMOVE_PLAYLIST_TRACK,
} from '@client/store/playlist/actionTypes';
import { PlaylistInterface } from '@client/store/playlist';

// Fetching many playlists
export const fetchPlaylistsRequest = () => ({
  type: FETCH_MANY_PLAYLISTS_REQUEST as typeof FETCH_MANY_PLAYLISTS_REQUEST,
});

export const fetchPlaylistsSuccess = (payload: PlaylistInterface[]) => ({
  payload,
  type: FETCH_MANY_PLAYLISTS_SUCCESS as typeof FETCH_MANY_PLAYLISTS_SUCCESS,
});

export const fetchPlaylistsFailure = () => ({
  type: FETCH_MANY_PLAYLISTS_FAILURE as typeof FETCH_MANY_PLAYLISTS_FAILURE,
});

// Fetching single playlist
export const fetchPlaylistRequest = (id: number) => ({
  payload: id,
  type: FETCH_SINGLE_PLAYLIST_REQUEST as typeof FETCH_SINGLE_PLAYLIST_REQUEST,
});

export const fetchPlaylistSuccess = (payload: PlaylistInterface) => ({
  payload,
  type: FETCH_SINGLE_PLAYLIST_SUCCESS as typeof FETCH_SINGLE_PLAYLIST_SUCCESS,
});

export const fetchPlaylistFailure = (id: number) => ({
  payload: id,
  type: FETCH_SINGLE_PLAYLIST_FAILURE as typeof FETCH_SINGLE_PLAYLIST_FAILURE,
});

// Delete single playlist
export const removePlaylistRequest = (id: number) => ({
  payload: id,
  type: REMOVE_PLAYLIST_REQUEST as typeof REMOVE_PLAYLIST_REQUEST,
});

export const removePlaylistSuccess = (id: number) => ({
  payload: id,
  type: REMOVE_PLAYLIST_SUCCESS as typeof REMOVE_PLAYLIST_SUCCESS,
});

export const removePlaylistFailure = (id: number) => ({
  payload: id,
  type: REMOVE_PLAYLIST_FAILURE as typeof REMOVE_PLAYLIST_FAILURE,
});

// Save single playlist
export const setSinglePlaylist = (payload: PlaylistInterface) => ({
  payload,
  type: SET_PLAYLIST as typeof SET_PLAYLIST,
});

export const removePlaylistTrack = (playlistId: number, trackId: number) => ({
  type: REMOVE_PLAYLIST_TRACK as typeof REMOVE_PLAYLIST_TRACK,
  payload: {
    playlistId,
    trackId,
  },
});

