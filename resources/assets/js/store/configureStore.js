import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as form } from 'redux-form';

export default (history) => {
  const composeEnhancers = process.env.NODE_ENV === 'production'
    ? compose
    // eslint-disable-next-line no-underscore-dangle
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  );

  return createStore(
    combineReducers({
      router: routerReducer,
      form,
    }),
    enhancer,
  );
};
