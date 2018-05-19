import App from '@app/client/components/App';
import Loading from '@app/client/components/Loading';
import WithUserContainer from '@app/client/containers/WithUserContainer';
import { SFC } from 'react';

export interface AppContainerProps {
  title: string;
}

const AppContainer: SFC<AppContainerProps> = props => (
  <WithUserContainer loadingComponent={Loading}>
    {user => <App {...props} user={user} />}
  </WithUserContainer>
);

export default AppContainer;
