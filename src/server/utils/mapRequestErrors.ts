import { set } from 'lodash';

interface Error {
  location: string;
  param: string;
  value: string;
  msg: string;
  [key: string]: string;
}

interface MapErrors {
  (errors: Error[]): Record<string, string>;
}

const mapErrors: MapErrors = (errors) => {
  return errors.reduce(
    (accum, error) => set(accum, error.param, error.msg),
    {},
  );
};

export default mapErrors;
