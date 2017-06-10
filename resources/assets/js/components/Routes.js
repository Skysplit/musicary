import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { App } from '../components';

export const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <Route path="/" component={App} />
  </ConnectedRouter>
);

Routes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default Routes;
