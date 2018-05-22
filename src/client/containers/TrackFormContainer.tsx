import { PureComponent } from 'react';
import { Formik, FormikActions } from 'formik';
import yup from 'yup';
import TrackForm from '@client/components/TrackForm';

export interface FormValues {
  url: string[];
}

type SubmitActions = FormikActions<FormValues>;

export default class TrackFormContainer extends PureComponent {
  private schema = yup.object({
    url: yup.array(yup.string().url('Field must be URL')),
  });

  handleSubmit = async (values: FormValues, actions: SubmitActions) => {

  }

  render() {
    const initialValues: FormValues = {
      url: [''],
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={this.schema}
      >
        {props => <TrackForm {...props} />}
      </Formik>
    );
  }
}
