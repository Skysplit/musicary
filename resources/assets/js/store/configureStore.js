import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const reducers = {};

export default (history) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  );

  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    enhancer,
  );
};
