import React, { PureComponent } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { TextField, Button, Checkbox } from 'react-md';

type LoginFormProps = FormikProps<FormikValues>;

export default class LoginForm extends PureComponent<LoginFormProps> {
  handleTextFieldChange = (value: string, event: any) => (
    this.props.handleChange(event)
  )

  handleCheckboxChange = (checked: boolean, event: any) => (
    this.props.handleChange(event)
  )

  render() {
    const { handleSubmit, errors, values } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={this.handleTextFieldChange}
          id="email"
          error={!!errors.email}
          errorText={errors.email}
          label="E-mail"
          value={values.email}
          fullWidth
        />

        <TextField
          onChange={this.handleTextFieldChange}
          id="password"
          label="Password"
          type="password"
          error={!!errors.password}
          errorText={errors.password}
          value={values.password}
          fullWidth
        />

        <Checkbox
          id="remember"
          name="remember"
          label="Remember me"
          onChange={this.handleCheckboxChange}
        />

        <Button type="submit" raised primary>
          Submit
        </Button>
      </form>
    );
  }
}
