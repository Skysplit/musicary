import { filter, map, sortBy, flow } from 'lodash/fp';
import { createSelector } from 'reselect';
import { State } from '@client/store';
import { PlaylistInterface } from '@server/module/playlist/playlist.model';

interface Props {
  id?: number;
}

const playlistsById = (state: State) => state.playlist.byId;

export const getPlaylists = createSelector(
  [playlistsById],
  (playlists) => {
    const loadedPlaylists: PlaylistInterface[] = flow([
      filter({ isLoading: false }),
      map('data'),
      sortBy('position'),
    ])(playlists);

    return loadedPlaylists;
  },
);

export const getIsPlaylistRemoving = (state: State, props: Props) => (
  getPlaylist(state, props).isRemoving
);

export const getPlaylist = (state: State, props: Props) => state.playlist.byId[props.id];
