import React from 'react';
import { Request } from 'express';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Context } from 'next/document';
import makeStore from '@client/store';
import AppContainer from '@client/containers/AppContainer';
import client, { getHeaders } from '@client/utils/client';
import { UserInterface } from '@client/store/user';
import { fetchUserSuccess } from '@client/store/user/actions';

import './app.scss';

interface ComponentContext extends Context {
  req: Request;
}

export interface CustomAppContext {
  Component: any;
  ctx: ComponentContext;
}

class CustomApp extends App {
  static async getUser(req: Request) {
    let user: UserInterface;
    const headers = getHeaders(req);

    try {
      const response = await client.get('/users/me', { headers });
      user = response.data as UserInterface;
    } catch (err) {
      user = null;
    }

    return user;
  }

  static async getInitialProps({ Component, ctx }: CustomAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const user = await CustomApp.getUser(ctx.req);

    return { pageProps, user };
  }

  constructor(props: any) {
    super(props);

    if (props.user) {
      props.store.dispatch(fetchUserSuccess(props.user));
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const { title } = pageProps;

    return (
      <Container>
        <Head>
          <title>{title}</title>
        </Head>
        <Provider store={store}>
          <AppContainer title={title}>
            <Component {...pageProps} />
          </AppContainer>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(CustomApp as any);
