import React, {  PureComponent } from 'react';
import { Formik, FormikValues, FormikActions } from 'formik';
import yup from 'yup';
import Router from '@next/router';
import client from '@client/utils/client';
import LoginForm from '@client/components/LoginForm';
import { UserInterface } from '@client/store/user';
import { saveUserToken, saveUserData } from '@app/client/utils/userData';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginFormContainerProps = {
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

export default class LoginFormContainer extends PureComponent<LoginFormContainerProps> {
  private schema = yup.object({
    email: yup.string().email('Wrong email address').required('Field cannot be empty'),
    password: yup.string().required('Field cannot be empty'),
  });

  private login(response: LoginSuccess, remember: boolean) {
    saveUserToken(response.token);
    saveUserData(response.user);
    Router.push('/');
  }

  private handleSubmit = async (values: FormikValues, actions: SubmitActions) => {
    const { setSubmitting, setErrors } = actions;
    setSubmitting(true);

    try {
      const response = await client.post('/users/login', values);
      this.login(response.data, values.remember);
      setSubmitting(false);
    } catch (err) {
      const { response } = err;
      setSubmitting(false);
      const data: LoginFailure = response.data;

      if (response.status === 422) {
        setErrors(data.errors);
      }
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
