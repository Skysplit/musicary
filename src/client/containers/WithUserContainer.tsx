import { connect } from 'react-redux';
import { getUser, getIsUserLoading } from '@client/store/user/selectors';
import { State } from '@client/store';
import WithUser from '@client/components/WithUser';

const mapStateToProps = (state: State) => ({
  isUserLoading: getIsUserLoading(state),
  user: getUser(state),
});

export default connect(mapStateToProps)(WithUser);
