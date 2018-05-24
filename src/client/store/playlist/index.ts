import { omit, map, uniq, reject } from 'lodash';
import {
  fetchPlaylistRequest,
  fetchPlaylistSuccess,
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistFailure,
  fetchPlaylistsFailure,
  setSinglePlaylist,
  removePlaylistRequest,
  removePlaylistSuccess,
  removePlaylistFailure,
  removePlaylistTrack,
} from '@client/store/playlist/actions';
import {
  FETCH_SINGLE_PLAYLIST_REQUEST,
  FETCH_SINGLE_PLAYLIST_SUCCESS,
  FETCH_MANY_PLAYLISTS_REQUEST,
  FETCH_MANY_PLAYLISTS_SUCCESS,
  FETCH_MANY_PLAYLISTS_FAILURE,
  FETCH_SINGLE_PLAYLIST_FAILURE,
  SET_PLAYLIST,
  REMOVE_PLAYLIST_REQUEST,
  REMOVE_PLAYLIST_SUCCESS,
  REMOVE_PLAYLIST_FAILURE,
  REMOVE_PLAYLIST_TRACK,
} from '@client/store/playlist/actionTypes';
import { fetchTracksSuccess, setSingleTrack } from '@client/store/track/actions';
import { FETCH_MANY_TRACKS_SUCCESS, SET_TRACK } from '@client/store/track/actionTypes';

export interface PlaylistInterface {
  id?: number;
  name: string;
  position?: number;
  tracks?: number[];
}

export interface PlaylistState {
  isLoading: boolean;
  byId: {
    [key: number]: {
      isLoading: boolean;
      isRemoving: boolean;
      data?: PlaylistInterface;
    };
  };
}

type Actions =
  | ReturnType<typeof fetchPlaylistRequest>
  | ReturnType<typeof fetchPlaylistSuccess>
  | ReturnType<typeof fetchPlaylistFailure>
  | ReturnType<typeof fetchPlaylistsRequest>
  | ReturnType<typeof fetchPlaylistsSuccess>
  | ReturnType<typeof fetchPlaylistsFailure>
  | ReturnType<typeof setSinglePlaylist>
  | ReturnType<typeof removePlaylistRequest>
  | ReturnType<typeof removePlaylistSuccess>
  | ReturnType<typeof removePlaylistFailure>
  | ReturnType<typeof fetchTracksSuccess>
  | ReturnType<typeof setSingleTrack>
  | ReturnType<typeof removePlaylistTrack>;


const initialState: PlaylistState = {
  isLoading: false,
  byId: {},
};

export default (state: PlaylistState = initialState, action: Actions): PlaylistState => {
  switch (action.type) {
    case FETCH_MANY_PLAYLISTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_MANY_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        byId: action.payload.reduce(
          (accum, data) => Object.assign(accum, {
            [data.id]: { data, isLoading: false },
          }),
          {},
        ),
      };
    }

    case FETCH_MANY_PLAYLISTS_FAILURE: {
      return state;
    }

    case FETCH_SINGLE_PLAYLIST_REQUEST: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            isLoading: true,
            isRemoving: false,
          },
        },
      };
    }

    case FETCH_SINGLE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            isLoading: false,
            isRemoving: false,
            data: action.payload,
          },
        },
      };
    }

    case FETCH_SINGLE_PLAYLIST_FAILURE: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            isLoading: false,
            isRemoving: false,
          },
        },
      };
    }

    case REMOVE_PLAYLIST_REQUEST: {
      const item = state.byId[action.payload];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            ...item,
            isRemoving: true,
          },
        },
      };
    }

    case REMOVE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        byId: omit(state.byId, [action.payload]),
      };
    }

    case REMOVE_PLAYLIST_FAILURE: {
      const item = state.byId[action.payload];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            ...item,
            isRemoving: false,
          },
        },
      };
    }

    case SET_PLAYLIST: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            isLoading: false,
            isRemoving: false,
            data: action.payload,

          },
        },
      };
    }

    case FETCH_MANY_TRACKS_SUCCESS: {
      const { playlistId, tracks } = action.payload;
      const playlist = state.byId[playlistId];

      if (!playlist) {
        return state;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [playlistId]: {
            ...playlist,
            data: {
              ...playlist.data,
              tracks: map(tracks, 'id'),
            },
          },
        },
      };
    }

    case SET_TRACK: {
      const { playlistId, track } = action.payload;
      const playlist = state.byId[playlistId];

      if (!playlist) {
        return;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [playlistId]: {
            ...playlist,
            data: {
              ...playlist.data,
              tracks: uniq([
                ...playlist.data.tracks,
                track.id,
              ]),
            },
          },
        },
      };
    }

    case REMOVE_PLAYLIST_TRACK: {
      const { playlistId, trackId } = action.payload;
      const playlist = state.byId[playlistId];

      if (!playlist) {
        return;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [playlistId]: {
            ...playlist,
            data: {
              ...playlist.data,
              tracks: reject(playlist.data.tracks, id => id === trackId),
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
