import React, { PureComponent } from 'react';
import ListItemLink from '@app/client/components/ListItemLink';
import { UserInterface } from '@client/store/user';
import { NavigationDrawer, ListItem, Divider } from 'react-md';
import { AppContainerProps } from '@app/client/containers/AppContainer';
import { removeUser } from '@app/client/utils/userData';
import Router from '@next/router';

export interface AppProps extends AppContainerProps {
  user: UserInterface;
}

export default class App extends PureComponent<AppProps> {
  private logout = () => {
    removeUser();
    this.props.logout();
    Router.push('/');
  }

  private guestItems() {
    return [
      <ListItem
        key="login"
        component={ListItemLink}
        route="login"
        primaryText="Login"
      />,

      <ListItem
        key="signup"
        primaryText="Sign up"
        component={ListItemLink}
        route="signup"
      />,
    ];
  }

  private userItems() {
    return [
      <ListItem
      key="playlists"
      primaryText="My playlists"
      component={ListItemLink}
      route="playlists"
      />,
      <Divider key="divider" />,
      <ListItem
        key="logout"
        primaryText="Log out"
        onClick={this.logout}
      />,
    ];
  }

  private items() {
    if (this.props.user) {
      return this.userItems();
    }

    return this.guestItems();
  }


  render() {
    const { children, title } = this.props;

    return (
      <NavigationDrawer
        drawerTitle="Musicary"
        toolbarTitle={title || 'Musicary'}
        navItems={[
          <ListItem
            key="home"
            component={ListItemLink}
            route="home"
            primaryText="Home"
          />,
          ...this.items(),
        ]}
      >
        {children}
      </NavigationDrawer>
    );
  }
}
