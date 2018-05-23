import { PureComponent } from 'react';
import { FormikProps } from 'formik';
import { TextField, Grid, Cell, Button } from 'react-md';
import { PlaylistFormValues } from '@client/containers/PlaylistFormContainer';

interface PlaylistFormProps extends FormikProps<PlaylistFormValues> {
  onCancel: () => void;
}

export default class PlaylistForm extends PureComponent<PlaylistFormProps> {
  handleChange = (value: string, event: any) => this.props.handleChange(event);

  handleCancel = () => {
    const { resetForm, onCancel } = this.props;
    onCancel();
    resetForm();
  }

  render() {
    const { handleSubmit, errors, values, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid noSpacing spacing={0} gutter={0}>
          <Cell phoneSize={3} tabletSize={6} desktopSize={11} align="middle">
            <TextField
              id="name"
              value={values.name}
              error={!!errors.name}
              errorText={errors.name}
              onChange={this.handleChange}
              placeholder="Playlist name"
              disabled={isSubmitting}
              fullWidth
            />
          </Cell>
          <Cell phoneSize={1} tabletSize={2} desktopSize={1} style={{ textAlign: 'right' }}>
            <Button type="submit" primary swapTheming icon disabled={isSubmitting}>
              checked
            </Button>{' '}
            <Button onClick={this.handleCancel} secondary icon disabled={isSubmitting}>
              close
            </Button>
          </Cell>
        </Grid>
      </form>
    );
  }
}
