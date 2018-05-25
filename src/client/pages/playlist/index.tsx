import React, { PureComponent } from 'react';
import { Request } from 'express';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import Error from 'next/error';
import { Context } from 'next/document';
import PlaylistsListContainer from '@client/containers/PlaylistsListContainer';
import client, { getHeaders } from '@client/utils/client';
import { PlaylistInterface } from '@client/store/playlist';
import { fetchPlaylistsSuccess } from '@client/store/playlist/actions';

interface PropsContext extends Context {
  req: Request;
}

interface InitialProps {
  title: string;
  errorCode?: number;
  playlists?: PlaylistInterface[];
}

interface PlaylistsPageProps extends InitialProps {
  fetchPlaylistsSuccess: typeof fetchPlaylistsSuccess;
}

export class PlaylistsPage extends PureComponent<PlaylistsPageProps> {
  static async fetchPlaylists(req: Request) {
    const headers = getHeaders(req);
    const response = await client.get('/playlists', { headers });
    return response.data as PlaylistInterface[];
  }

  static async getInitialProps(ctx: PropsContext): Promise<InitialProps> {
    let errorCode: number;
    let playlists: PlaylistInterface[];

    try {
      playlists = await PlaylistsPage.fetchPlaylists(ctx.req);
    } catch (err) {
      errorCode = err.response.status;
    }

    return {
      errorCode,
      playlists,
      title: 'My playlists',
    };
  }

  constructor(props: PlaylistsPageProps) {
    super(props);

    if (props.playlists) {
      props.fetchPlaylistsSuccess(props.playlists);
    }
  }

  render() {
    const { errorCode } = this.props;

    if (errorCode) {
      return <Error statusCode={errorCode} />;
    }

    return (
      <PlaylistsListContainer />
    );
  }
}

const actionCreators = {
  fetchPlaylistsSuccess,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(PlaylistsPage);
