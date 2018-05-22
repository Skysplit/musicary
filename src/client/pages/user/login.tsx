import React, { PureComponent, Fragment } from 'react';
import LoginFormContainer from '@app/client/containers/LoginFormContainer';

export default class UserLoginPage extends PureComponent {
  static async getInitialProps() {
    return { title: 'Login' };
  }

  render() {
    return (
      <Fragment>
        <h1>Login</h1>

        <LoginFormContainer />
      </Fragment>
    );
  }
}
