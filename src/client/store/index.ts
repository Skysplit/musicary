import { createStore } from 'redux';
import { StoreCreatorOptions } from 'next-redux-wrapper';
import { Request } from 'express';
import { UserState } from '@app/client/store/user';
import rootReducer from './rootReducer';
import middleware from './middleware';

export interface State {
  user: UserState;
}

interface Options extends StoreCreatorOptions<{}, {}, {}, {}, {}> {
  req: Request;
}

export default (initialState: State, options: Options) => {
  return createStore(rootReducer, middleware);
};
