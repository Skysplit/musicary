import { PureComponent, ReactNode, ComponentClass, StatelessComponent } from 'react';
import { UserInterface } from '@client/store/user';
import { fetchUser } from '@app/client/store/user/operations';
import { getUserToken } from '@app/client/utils/userData';

export interface WithUserProps {
  user: UserInterface;
  loadingComponent: ComponentClass | StatelessComponent;
  isUserLoading: boolean;
  fetchUser: typeof fetchUser;
  forceFetch?: boolean;
  children: (user?: UserInterface) => ReactNode;
}

export default class WithUser extends PureComponent<WithUserProps> {
  static defaultProps = {
    forceFetch: false,
  };

  componentDidMount() {
    const { user, isUserLoading, forceFetch } = this.props;
    const token = getUserToken();

    if (!token) {
      return;
    }

    if ((isUserLoading || user) && !forceFetch) {
      return;
    }

    this.props.fetchUser();
  }

  render() {
    const {
      children,
      user,
      isUserLoading,
      loadingComponent: Loading,
    } = this.props;

    if (isUserLoading) {
      return <Loading />;
    }

    return children(user);
  }
}
