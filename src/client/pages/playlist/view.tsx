import { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Context } from 'next/document';
import Error from 'next/error';
import { Request } from 'express';
import { PlaylistInterface } from '@client/store/playlist';
import { setSinglePlaylist } from '@client/store/playlist/actions';
import client, { getHeaders } from '@client/utils/client';
import PlaylistView from '@client/components/PlaylistView';
import { fetchTracksSuccess } from '@client/store/track/actions';
import { TrackInterface } from '@client/store/track';

interface PageContext extends Context {
  req: Request;
}

interface InitialProps {
  title: string;
  playlist?: PlaylistInterface;
  tracks?: TrackInterface[];
  errorCode?: number;
}

interface PlaylistViewPageProps extends InitialProps {
  setSinglePlaylist: typeof setSinglePlaylist;
  fetchTracksSuccess: typeof fetchTracksSuccess;
}

type ComponentProps = PlaylistViewPageProps & {};

type AuthHeaders = ReturnType<typeof getHeaders>;

export class PlaylistViewPage extends PureComponent<ComponentProps> {
  static async fetchPlaylist(id: number, headers: AuthHeaders) {
    const response = await client.get(`/playlists/${id}`, { headers });
    return response.data as PlaylistInterface;
  }

  static async fetchPlaylistTracks(id: number, headers: AuthHeaders) {
    const response = await client.get(`/playlists/${id}/tracks`, { headers });
    return response.data as TrackInterface[];
  }

  static async getInitialProps({ req, query }: PageContext): Promise<InitialProps> {
    let playlist: PlaylistInterface;
    let tracks: TrackInterface[];
    let errorCode: number;
    let title = 'Playlist';

    try {
      const headers = getHeaders(req);

      [playlist, tracks] = await Promise.all([
        PlaylistViewPage.fetchPlaylist(query.id as number, headers),
        PlaylistViewPage.fetchPlaylistTracks(query.id as number, headers),
      ]);

      title = `Playlist | ${playlist.name}`;
    } catch (err) {
      errorCode = err.response.status;
    }

    return {
      title,
      playlist,
      tracks,
      errorCode,
    };
  }

  constructor(props: ComponentProps) {
    super(props);

    if (props.playlist) {
      props.setSinglePlaylist(props.playlist);
      props.fetchTracksSuccess(props.playlist.id, props.tracks);
    }
  }

  render() {
    const { errorCode, playlist, tracks } = this.props;

    if (errorCode) {
      return <Error statusCode={errorCode} />;
    }

    return (
      <PlaylistView
        playlist={playlist}
        tracks={tracks}
      />
    );
  }
}

const actionCreators = {
  setSinglePlaylist,
  fetchTracksSuccess,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(PlaylistViewPage);
