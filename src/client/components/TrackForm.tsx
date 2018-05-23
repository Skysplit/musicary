import { PureComponent, Fragment } from 'react';
import { TextField, Button, Grid, Cell } from 'react-md';
import { FormikProps, FormikValues, FieldArray, ArrayHelpers } from 'formik';
import { last, has, get, isEmpty, every } from 'lodash';

interface TrackFormValues extends FormikValues {
  url: string[];
}

type ComponentProps = FormikProps<TrackFormValues>;

export default class TrackForm extends PureComponent<ComponentProps> {
  handleChange = (value: string, e: any) => this.props.handleChange(e);

  canAddTrack = () => {
    const { errors, values } = this.props;
    return isEmpty(errors) && every(values.url);
  }

  addTrack = (helpers: ArrayHelpers) => () => {
    const { values } = this.props;

    if (last(values.url)) {
      helpers.push('');
    }
  }

  removeTrack = (helpers: ArrayHelpers, index: number) => () => {
    helpers.remove(index);
  }

  render() {
    const { handleSubmit, values, errors } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray
          name="url"
          render={arrayHelpers => (
            <Fragment>
              {values.url.map((value, index) => (
                <Grid key={index} noSpacing gutter={0}>
                  <Cell align="middle" phoneSize={3} tabletSize={7} desktopSize={11}>
                    <TextField
                      id={`url.${index}`}
                      value={value}
                      onChange={this.handleChange}
                      error={!!get(errors, ['url', index])}
                      errorText={get(errors, ['url', index])}
                      placeholder="Paste track url here"
                    />
                  </Cell>
                  {values.url.length > 1 && (
                    <Cell
                      align="middle"
                      style={{ textAlign: 'left' }}
                      phoneSize={1}
                      tabletSize={1}
                      desktopSize={1}
                    >
                      <Button
                        onClick={this.removeTrack(arrayHelpers, index)}
                        secondary
                        icon
                      >
                        close
                      </Button>
                    </Cell>
                  )}
                </Grid>
              ))}
              <Button type="submit" secondary raised>
                Save
              </Button>
              {' '}
              {this.canAddTrack() && (
                <Button
                  onClick={this.addTrack(arrayHelpers)}
                  primary
                  raised
                  >
                  Add track
                </Button>
              )}
            </Fragment>
          )}
        />
      </form>
    );
  }
}
