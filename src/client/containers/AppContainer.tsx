import React, { SFC } from 'react';
import { connect } from 'react-redux';
import App from '@app/client/components/App';
import WithUserContainer from '@app/client/containers/WithUserContainer';
import { logout } from '@app/client/store/user/actions';

export interface AppContainerProps {
  title: string;
  logout: typeof logout;
}

const AppContainer: SFC<AppContainerProps> = props => (
  <WithUserContainer>
    {user => <App {...props} user={user} />}
  </WithUserContainer>
);

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(AppContainer);
