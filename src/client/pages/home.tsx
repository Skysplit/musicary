import React, { Component, Fragment } from 'react';
import Link from '@next/link';

export class IndexPage extends Component {
  render() {
    return (
      <Fragment>
        <h1>Hello world</h1>

        <Link route="login">
          <a>Login page</a>
        </Link>
      </Fragment>
    );
  }
}

export default IndexPage;
