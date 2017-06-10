import React, { Component } from 'react';
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

export class App extends Component {
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

export default App;
