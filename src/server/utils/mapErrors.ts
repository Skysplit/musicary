import { ValidationError } from 'class-validator';
import { first, values } from 'lodash';

interface MapErrors {
  (errors: ValidationError[]): {
    [key: string]: string[],
  };
}

const mapErrors: MapErrors = (errors) => {
  return errors.reduce(
    (accum, error) => Object.assign(accum, {
      [error.property]: first(values(error.constraints)),
    }),
    {},
  );
};

export default mapErrors;
