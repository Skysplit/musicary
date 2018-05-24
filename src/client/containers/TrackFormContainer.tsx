import { PureComponent } from 'react';
import { Formik, FormikActions } from 'formik';
import yup from 'yup';
import { PlaylistInterface } from '@client/store/playlist';
import TrackForm from '@client/components/TrackForm';
import client from '@client/utils/client';

export interface FormValues {
  url: string[];
}

type SubmitActions = FormikActions<FormValues>;

type ComponentProps = {
  playlist: PlaylistInterface;
};

export default class TrackFormContainer extends PureComponent<ComponentProps> {
  private schema = yup.object({
    url: yup.array(
      yup.string().url('Field must be URL').required('Field cannot be empty'),
    ),
  });

  handleSubmit = async (values: FormValues, actions: SubmitActions) => {
    const { playlist } = this.props;

    actions.setSubmitting(true);
    try {
      actions.setSubmitting(true);
      await client.post(`/playlists/${playlist.id}/tracks`, values);
      actions.resetForm();
    } catch (err) {
      const { response = {} } = err;
      actions.setSubmitting(false);

      if (response.status === 422) {
        actions.setErrors(err.response.data);
      }
    }
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
