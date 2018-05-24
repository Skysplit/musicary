import { PureComponent } from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import SignupFormContainer from '@client/containers/SignupFormContainer';

export default class SignupPage extends PureComponent {
  static async getInitialProps() {
    return { title: 'Sign up!' };
  }

  render() {
    return (
      <Card>
        <CardTitle title="Sign up" />
        <CardText expandable={false}>
          <SignupFormContainer />
        </CardText>
      </Card>
    );
  }
}
