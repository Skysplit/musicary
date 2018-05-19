import { PureComponent, ReactNode, ComponentClass, StatelessComponent } from 'react';
import { UserInterface } from '@app/server/module/user/user.model';
import { fetchUser } from '@app/client/store/user/operations';

export interface WithUserProps {
  user: UserInterface;
  loadingComponent: ComponentClass | StatelessComponent;
  isUserLoading: boolean;
  fetchUser: typeof fetchUser;
  children: (user?: UserInterface) => ReactNode;
}

export default class WithUser extends PureComponent<WithUserProps> {
  componentDidMount() {
    const { user, isUserLoading } = this.props;

    if (isUserLoading || user) {
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
