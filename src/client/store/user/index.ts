import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from '@app/client/store/user/actionTypes';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
} from '@app/client/store/user/actions';

export interface UserState {
  user?: {
    id: number;
    email: string;
  };
  isLoading: boolean;
}

export type UserActions =
  | ReturnType<typeof fetchUserRequest>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailure>;


const initialState: UserState = {
  user: null,
  isLoading: false,
};

export default (state: UserState = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }

    case FETCH_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
