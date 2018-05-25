import React, { PureComponent } from 'react';
import { Card, CardTitle } from 'react-md';

export default class IndexPage extends PureComponent {
  static async getInitialProps() {
    return { title: 'Homepage' };
  }

  render() {
    return (
      <Card>
        <CardTitle title="Welcome to musicary" />
      </Card>
    );
  }
}
