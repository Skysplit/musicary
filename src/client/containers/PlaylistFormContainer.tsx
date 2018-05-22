import { PureComponent } from 'react';
import { get } from 'lodash';
import { Formik, FormikValues, FormikActions } from 'formik';
import yup from 'yup';
import PlaylistForm from '@client/components/PlaylistForm';
import { PlaylistInterface } from '@client/store/playlist';

export interface PlaylistFormValues extends FormikValues {
  name: string;
}

export interface PlaylistFormContainerProps {
  playlist?: PlaylistInterface;
  onSave: (playlist: PlaylistInterface) => Promise<PlaylistInterface>;
  onSaved: (playlist: PlaylistInterface) => any;
  onCancel: () => any;
}

type SubmitActions = FormikActions<PlaylistFormValues>;

export default class PlaylistFormContainer extends PureComponent<PlaylistFormContainerProps>{
  private validationSchema = yup.object({
    name: yup.string().required('Field cannot be empty'),
  });

  handleSubmit = async (values: PlaylistFormValues, actions: SubmitActions) => {
    const { onSave, onSaved } = this.props;
    const { setSubmitting, setErrors, resetForm } = actions;

    setSubmitting(true);

    try {
      const playlist = await onSave(values);
      setSubmitting(false);
      resetForm();
      onSaved(playlist);
    } catch (err) {
      const { response = {} } = err;

      if (response.status === 422) {
        setErrors(response.data);
      }

      setSubmitting(false);
    }
  }

  render() {
    const { playlist, onCancel } = this.props;
    const initialValues: PlaylistFormValues = {
      name: get(playlist, 'name', ''),
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={this.validationSchema}
      >
        {props => (
          <PlaylistForm {...props} onCancel={onCancel} />
        )}
      </Formik>
    );
  }
}
