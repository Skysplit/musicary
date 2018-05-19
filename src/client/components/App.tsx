import React, { PureComponent } from 'react';
import ListItemLink from '@app/client/components/ListItemLink';
import { UserInterface } from '@app/server/module/user/user.model';
import { NavigationDrawer, ListItem } from 'react-md';
import { AppContainerProps } from '@app/client/containers/AppContainer';

export interface AppProps extends AppContainerProps {
  user: UserInterface;
}

export default class App extends PureComponent<AppProps> {
  userItems() {
    return [
      <ListItem key="login" component={ListItemLink} route="login" primaryText="Login" />,
      <ListItem key="signup" primaryText="Sign up" />,
    ];
  }

  guestItems() {
    return [
      <ListItem primaryText="Log out" />,
    ];
  }

  items() {
    if (this.props.user) {
      return this.userItems();
    }

    return this.guestItems();
  }


  render() {
    const { children, title } = this.props;


    return (
      <NavigationDrawer
        drawerHeader={false}
        toolbarTitle={title || 'Musicary'}
        navItems={[
          <ListItem component={ListItemLink} route={'home'} primaryText="Home"  />,
          ...this.items(),
        ]}
      >
        {children}
      </NavigationDrawer>
    );
  }
}
