import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { getUser, getIsUserLoading } from '@client/store/user/selectors';
import { fetchUser } from '@client/store/user/operations';
import { State } from '@client/store';
import WithUser from '@client/components/WithUser';

const mapStateToProps = (state: State) => ({
  isUserLoading: getIsUserLoading(state),
  user: getUser(state),
});

const actionCreators = {
  fetchUser,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WithUser);
