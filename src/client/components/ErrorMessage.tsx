import { SFC, Fragment } from 'react';

interface ErrorProps {
  title: string;
  message?: string;
}

const ErrorMessage: SFC<ErrorProps> = ({ title, message }) => (
  <Fragment>
    <h1>{title}</h1>
    {message && <p>{message}</p>}
  </Fragment>
);

export default ErrorMessage;
