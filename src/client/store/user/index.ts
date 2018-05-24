import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  logout,
} from '@client/store/user/actions';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  LOGOUT,
} from '@client/store/user/actionTypes';

export interface UserInterface {
  id: number;
  email: string;
}

export interface UserState {
  user?: UserInterface;
  isLoading: boolean;
}

export type UserActions =
  | ReturnType<typeof fetchUserRequest>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailure>
  | ReturnType<typeof logout>;

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

    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};
