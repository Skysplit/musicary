import { createStore } from 'redux';
import { StoreCreatorOptions } from 'next-redux-wrapper';
import { Request } from 'express';
import rootReducer from './rootReducer';
import middleware from './middleware';

export type State = ReturnType<typeof rootReducer>;

interface Options extends StoreCreatorOptions<State, {}, {}, {}, {}> {
  req: Request;
}

export default (initialState: State, options: Options) => {
  return createStore(rootReducer, middleware);
};
