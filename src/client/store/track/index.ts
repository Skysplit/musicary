import { fetchTracksSuccess } from '@client/store/track/actions';
import { FETCH_MANY_TRACKS_SUCCESS } from '@client/store/track/actionTypes';

export interface TrackInterface {
  id: number;
  name: string;
  sourceId: string;
  sourceType: string;
}

export interface TrackState {
  byId: {
    [key: number]: {
      isLoading: boolean;
      isRemoving: boolean;
      data: TrackInterface;
    },
  };
}

type Actions =
  | ReturnType<typeof fetchTracksSuccess>;

const initialState = {
  byId: {},
};

export default (state: TrackState = initialState, action: Actions) => {
  switch (action.type) {
    case FETCH_MANY_TRACKS_SUCCESS: {
      return {
        ...state,
        byId: action.payload.tracks.reduce(
          (accum, track) => Object.assign(accum, {
            [track.id]: {
              isLoading: false,
              isRemoving: false,
              data: track,
            },
          }),
          {},
        ),
      };
    }

    default: {
      return state;
    }
  }
};
