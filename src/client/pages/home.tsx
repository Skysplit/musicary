import React, { Component, Fragment } from 'react';
import Link from '@next/link';

export interface IndexPageProps {

}

export default class IndexPage extends Component<IndexPageProps> {
  render() {
    return (
      <Fragment>
        <h1>Hello world</h1>

        <Link route="test">
          <a>Go to some page</a>
        </Link>
      </Fragment>
    );
  }
}
