import { PureComponent, Fragment } from 'react';
import { TextField, Button, Grid, Cell } from 'react-md';
import { FormikProps, FormikValues, FieldArray, ArrayHelpers } from 'formik';
import { last, has, get } from 'lodash';

interface TrackFormValues extends FormikValues {
  url: string[];
}

type ComponentProps = FormikProps<TrackFormValues>;

export default class TrackForm extends PureComponent<ComponentProps> {


  handleChange = (value: string, e: any) => this.props.handleChange(e);

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
                  <Cell align="middle" size={11}>
                    <TextField
                      id={`url.${index}`}
                      value={value}
                      onChange={this.handleChange}
                      error={has(errors, ['url', index])}
                      errorText={get(errors, ['url', index])}
                    />
                  </Cell>
                  {values.url.length > 1 && (
                    <Cell align="middle" style={{ textAlign: 'left' }} size={1}>
                      <Button
                        icon
                        secondary
                        onClick={this.removeTrack(arrayHelpers, index)}
                      >
                        close
                      </Button>
                    </Cell>
                  )}
                </Grid>
              ))}
              <Button raised primary onClick={this.addTrack(arrayHelpers)}>
                Add track
              </Button>
            </Fragment>
          )}
        />
      </form>
    );
  }
}
