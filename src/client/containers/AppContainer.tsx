import React, { SFC } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import App from '@app/client/components/App';
import Loading from '@app/client/components/Loading';
import WithUserContainer from '@app/client/containers/WithUserContainer';
import { logout } from '@app/client/store/user/actions';

export interface AppContainerProps {
  title: string;
  logout: typeof logout;
}

const AppContainer: SFC<AppContainerProps> = props => (
  <WithUserContainer loadingComponent={Loading}>
    {user => <App {...props} user={user} />}
  </WithUserContainer>
);

const actionCreators = {
  logout,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);
