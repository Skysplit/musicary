import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-md';

import TextField from '../Forms/Inputs/TextField';

export const LoginForm = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name="email" label="email" component={TextField} type="text" />
    </div>
    <div>
      <Field name="password" label="password" component={TextField} type="password" />
    </div>
    <div>
      <Button type="submit" label="Sign in" primary raised />
    </div>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'login' })(LoginForm);
