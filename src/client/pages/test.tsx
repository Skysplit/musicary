import React, { Component } from 'react';
import Link from '@next/link';

export interface TestPageProps {

}

export default class TestPage extends Component<TestPageProps> {
  render() {
    return (
      <Link route="home">
        <a>Home</a>
      </Link>
    );
  }
}
