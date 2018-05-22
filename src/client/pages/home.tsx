import React, { Component, Fragment } from 'react';

export default class IndexPage extends Component {
  static async getInitialProps() {
    return { title: 'Homepage' };
  }

  render() {
    return (
      <Fragment>
        <h1>Welcome to musicary</h1>
      </Fragment>
    );
  }
}
