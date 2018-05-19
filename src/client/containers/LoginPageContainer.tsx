import { withRouter } from 'next/router';
import { compose } from 'recompose';
import LoginPage from '@app/client/components/LoginPage';

export default compose(withRouter)(LoginPage);
