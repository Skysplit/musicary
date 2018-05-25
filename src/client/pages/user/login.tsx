import React, { PureComponent } from 'react';
import { Card, CardText, CardTitle } from 'react-md';
import LoginFormContainer from '@app/client/containers/LoginFormContainer';

export default class UserLoginPage extends PureComponent {
  static async getInitialProps() {
    return { title: 'Login' };
  }

  render() {
    return (
      <Card>
        <CardTitle title="Login" />
        <CardText>
          <LoginFormContainer />
        </CardText>
      </Card>
    );
  }
}
