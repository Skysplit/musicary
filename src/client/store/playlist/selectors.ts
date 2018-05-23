import { filter, map, sortBy, flow } from 'lodash/fp';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { State } from '@client/store';
import { tracksById } from '@client/store/track/selectors';
import { TrackInterface } from '@client/store/track';
import { PlaylistInterface } from '@client/store/playlist';

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

export const getPlaylistData = (state: State, props: Props) => getPlaylist(state, props)!.data;

export const getPlaylistTracks = createCachedSelector(
  getPlaylistData,
  tracksById,
  (playlist, tracks) => {
    const playlistTracks: TrackInterface[] = flow([
      map((id: number) => tracks[id]),
      filter({ isLoading: false }),
      map('data'),
    ])(playlist.tracks);

    return playlistTracks;
  },
)(
  (state, props) => props.id,
);
