import React, {  PureComponent } from 'react';
import { SingletonRouter } from 'next/router';
import { Formik, FormikValues, FormikActions } from 'formik';
import yup from 'yup';
import client from '@client/utils/client';
import LoginForm from '@client/components/LoginForm';
import { UserInterface } from '@app/server/module/user/user.model';
import { saveUserToken, saveUserData } from '@app/client/utils/userData';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginPageProps = {
  router: SingletonRouter;
};

type SubmitActions = FormikActions<LoginFormValues>;

interface LoginSuccess {
  success: true;
  user: UserInterface;
  token: string;
}

interface LoginFailure {
  errors: {
    email?: string;
    password?: string;
  };
}

export default class LoginPage extends PureComponent<LoginPageProps> {
  private schema = yup.object({
    email: yup.string().email('Wrong email address').required('Field cannot be empty'),
    password: yup.string().required('Field cannot be empty'),
  });

  private login(response: LoginSuccess, remember: boolean) {
    saveUserToken(response.token);
    saveUserData(response.user);
    this.props.router.push('/');
  }

  private handleSubmit = async (values: FormikValues, actions: SubmitActions) => {
    actions.setSubmitting(true);

    try {
      const response = await client.post('/users/login', values);
      this.login(response.data, values.remember);
    } catch (err) {
      const { response } = err;
      const data: LoginFailure = response.data;

      if (response.status === 422) {
        actions.setErrors(data.errors);
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  render() {
    const initialValues: LoginFormValues = {
      email: '',
      password: '',
      remember: true,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={this.schema}
      >
        {props => (
          <LoginForm {...props} />
        )}
      </Formik>
    );
  }
}
