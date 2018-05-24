import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, FormikValues, FormikActions } from 'formik';
import yup from 'yup';
import SignupForm from '@client/components/SignupForm';
import client from '@client/utils/client';
import { UserInterface } from '@client/store/user';
import { fetchUserSuccess } from '@client/store/user/actions';
import { saveUserData, saveUserToken } from '@client/utils/userData';
import Router from '@next/router';

export interface SignupFormValues extends FormikValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

type SubmitActions = FormikActions<SignupFormValues>;

interface SuccessResponse {
  success: true;
  user: UserInterface;
  token: string;
}

type ComponentProps = {
  fetchUserSuccess: typeof fetchUserSuccess;
};

export class SignupFormContainer extends PureComponent<ComponentProps> {
  private schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string()
      .required('password confirmation is required')
      .when('password', (password: string, schema: yup.StringSchema) => {
        return schema.oneOf([password], 'confirmation must match password');
      }),
  });

  private handleSubmit = async (values: SignupFormValues, actions: SubmitActions) => {
    const { setSubmitting, setErrors } = actions;
    const { fetchUserSuccess } = this.props;

    setSubmitting(true);

    try {
      const response = await client.post('/users', values);
      const data = response.data as SuccessResponse;
      saveUserData(data.user);
      saveUserToken(data.token);
      fetchUserSuccess(data.user);
      Router.pushRoute('home');
      setSubmitting(false);
    } catch (err) {
      const { response = {} } = err;

      setSubmitting(false);
      if (response.status === 422) {
        setErrors(response.data);
      }
    }
  }

  render() {
    const initalValues: SignupFormValues = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };

    return (
      <Formik
        initialValues={initalValues}
        onSubmit={this.handleSubmit}
        validationSchema={this.schema}
      >
        {props => <SignupForm {...props} />}
      </Formik>
    );
  }
}

const mapDispatchToProps = {
  fetchUserSuccess,
};

export default connect(null, mapDispatchToProps)(SignupFormContainer);
