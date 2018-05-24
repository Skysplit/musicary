import { PureComponent, ReactNode } from 'react';
import { UserInterface } from '@client/store/user';

export interface WithUserProps {
  user: UserInterface;
  children: (user?: UserInterface) => ReactNode;
}

export default class WithUser extends PureComponent<WithUserProps> {
  render() {
    const { children, user } = this.props;
    return children(user);
  }
}
