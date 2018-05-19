import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import WithUser from '@app/client/components/WithUser';
import { getUser, getIsUserLoading } from '@app/client/store/user/selectors';
import { State } from '@app/client/store';
import { fetchUser } from '@app/client/store/user/operations';

const mapStateToProps = (state: State) => ({
  isUserLoading: getIsUserLoading(state),
  user: getUser(state),
});

const actionCreators = {
  fetchUser,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WithUser);
