import { PureComponent } from 'react';
import { TextField, Grid, Cell, Button } from 'react-md';
import { FormikProps } from 'formik';
import { SignupFormValues } from '@client/containers/SignupFormContainer';

type ComponentProps = FormikProps<SignupFormValues>;

export default class SignupForm extends PureComponent<ComponentProps> {
  handleChange = (value: string, event: any) => this.props.handleChange(event);

  render() {
    const { handleSubmit, isValid, errors, values, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Cell size={12}>
            <TextField
              id="email"
              type="email"
              label="E-mail"
              error={!!errors.email}
              errorText={errors.email}
              onChange={this.handleChange}
              value={values.email}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell size={12}>
            <TextField
              id="password"
              type="password"
              label="Password"
              error={!!errors.password}
              errorText={errors.password}
              onChange={this.handleChange}
              value={values.password}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell size={12}>
            <TextField
              id="passwordConfirmation"
              type="password"
              label="Confirm password"
              error={!!errors.passwordConfirmation}
              errorText={errors.passwordConfirmation}
              onChange={this.handleChange}
              value={values.passwordConfimration}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell size={12}>
            <Button raised primary type="submit" disabled={!isValid || isSubmitting}>
              Sign up!
            </Button>
          </Cell>
        </Grid>
      </form>
    );
  }
}
