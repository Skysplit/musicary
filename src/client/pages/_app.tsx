import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import { Context } from 'next/document';
import makeStore from '@client/store';
import AppContainer from '@client/containers/AppContainer';

import './app.scss';

export interface CustomAppContext {
  Component: any;
  ctx: Context;
}

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }: CustomAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <AppContainer title={pageProps.title}>
            <Component {...pageProps} />
          </AppContainer>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(CustomApp as any);
