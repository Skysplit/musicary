import React, { PureComponent } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { TextField, Button, Checkbox, Grid, Cell } from 'react-md';

interface LoginFormValues extends FormikValues {
  email: string;
  password: string;
}

type LoginFormProps = FormikProps<LoginFormValues>;

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
        <Grid>
          <Cell size={12}>
            <TextField
              onChange={this.handleTextFieldChange}
              id="email"
              error={!!errors.email}
              errorText={errors.email}
              label="E-mail"
              value={values.email}
              fullWidth
            />
          </Cell>
        </Grid>

        <Grid>
          <Cell size={12}>
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
          </Cell>
        </Grid>

        <Grid>
          <Cell desktopSize={6} tabletSize={4} phoneSize={2}>
            <Checkbox
              id="remember"
              name="remember"
              label="Remember me"
              onChange={this.handleCheckboxChange}
            />
          </Cell>
          <Cell desktopSize={6} tabletSize={4} phoneSize={2}>
            <Button type="submit" raised primary>
              Submit
            </Button>
          </Cell>
        </Grid>
      </form>
    );
  }
}
