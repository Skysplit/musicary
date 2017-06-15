import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import combinedEpics from './configureEpics';
import user from './user';

export default (history) => {
  const composeEnhancers = process.env.NODE_ENV === 'production'
    ? compose
    // eslint-disable-next-line no-underscore-dangle
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const epicMiddleware = createEpicMiddleware(combinedEpics);

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      epicMiddleware,
      routerMiddleware(history),
    ),
  );

  return createStore(
    combineReducers({
      router: routerReducer,
      form,
      user,
    }),
    enhancer,
  );
};
