import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Routes from './components/Routes';
import configureStore from './store/configureStore';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app'),
);
