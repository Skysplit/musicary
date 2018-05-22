import { TrackInterface } from '@client/store/track';
import { FETCH_MANY_TRACKS_SUCCESS } from '@client/store/track/actionTypes';

// Fetch many tracks
export const fetchTracksSuccess = (playlistId: number, tracks: TrackInterface[]) => ({
  type: FETCH_MANY_TRACKS_SUCCESS as typeof FETCH_MANY_TRACKS_SUCCESS,
  payload: {
    playlistId,
    tracks,
  },
});
