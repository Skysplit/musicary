import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Paper } from 'react-md';

import LoginForm from './LoginForm';
import { login as attemptLogin } from '../../store/user/actions';

export class Login extends Component {
  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
  }

  onSubmit = (values) => {
    const { email, password } = values;
    return this.props.attemptLogin(email, password);
  }

  render() {
    return (
      <div>
        <h1>Log in</h1>
        <Paper component={Card} zDepth={1} className="md-grid">
          <LoginForm onSubmit={this.onSubmit} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  attemptLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
