import React, { Component } from 'react';

import LoginForm from './LoginForm';

export class Login extends Component {
  onSubmit = (values, dispatch, props) => {
    console.log(values);
    console.log(values);
    console.log(props);
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }

}

export default Login;
