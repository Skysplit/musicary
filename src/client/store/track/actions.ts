import {
  FETCH_MANY_TRACKS_SUCCESS,
  SET_TRACK,
} from '@client/store/track/actionTypes';
import { TrackInterface } from '@client/store/track';

// Fetch many tracks
export const fetchTracksSuccess = (playlistId: number, tracks: TrackInterface[]) => ({
  type: FETCH_MANY_TRACKS_SUCCESS as typeof FETCH_MANY_TRACKS_SUCCESS,
  payload: {
    playlistId,
    tracks,
  },
});

export const setSingleTrack = (playlistId: number, track: TrackInterface) => ({
  type: SET_TRACK as typeof SET_TRACK,
  payload: {
    playlistId,
    track,
  },
});
