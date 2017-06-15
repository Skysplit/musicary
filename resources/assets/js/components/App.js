import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import {
  NavigationDrawer,
  Button,
} from 'react-md';

import {
  Home,
  Login,
} from './';

import { getUser } from '../store/user/actions';

export class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getUser();
  }

  getDrawerOptions = () => {
    const { FULL_HEIGHT, TEMPORARY } = NavigationDrawer.DrawerTypes;

    return {
      desktopDrawerType: FULL_HEIGHT,
      tabletDrawerType: TEMPORARY,
      mobileDrawerType: TEMPORARY,
    };
  }

  renderLink = to => ({ children, ...props }) => <Link {...props} to={to}>{children}</Link>;

  render() {
    return (
      <NavigationDrawer
        {...this.getDrawerOptions()}
        drawerTitle={Laravel.config.name}
        toolbarActions={[
          <Button component={this.renderLink('/register')} icon tooltipLabel={`Join ${Laravel.config.name}!`}>person_add</Button>,
          <Button component={this.renderLink('/login')} icon tooltipLabel="Sign in">account_circle</Button>,
        ]}
      >
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </NavigationDrawer>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
