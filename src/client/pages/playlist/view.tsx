import { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Request } from 'express';
import io from 'socket.io-client';
import { Snackbar } from 'react-md';
import { Context } from 'next/document';
import Error from 'next/error';
import { PlaylistInterface } from '@client/store/playlist';
import { setSinglePlaylist, removePlaylistTrack } from '@client/store/playlist/actions';
import client, { getHeaders } from '@client/utils/client';
import { fetchTracksSuccess, setSingleTrack, removeTrack } from '@client/store/track/actions';
import { TrackInterface } from '@client/store/track';
import { getUserToken } from '@client/utils/userData';
import PlaylistViewContainer from '@client/containers/PlaylistViewContainer';

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
  setSingleTrack: typeof setSingleTrack;
  removePlaylistTrack: typeof removePlaylistTrack;
}

type ComponentProps = PlaylistViewPageProps & {};

interface Toast {
  text: string;
}

type ComponentState = {
  toasts: Toast[],
};

type AuthHeaders = ReturnType<typeof getHeaders>;

export class PlaylistViewPage extends PureComponent<ComponentProps, ComponentState> {
  private io: SocketIOClient.Socket;

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

  state: ComponentState = {
    toasts: [],
  };

  constructor(props: ComponentProps) {
    super(props);

    if (props.playlist) {
      props.setSinglePlaylist(props.playlist);
      props.fetchTracksSuccess(props.playlist.id, props.tracks);
    }
  }

  private handleSocketConnection = () => {
    const { toasts } = this.state;
    const toast = { text: 'Connected with server!' };

    this.setState({
      toasts: [...toasts, toast],
    });
  }

  private handleSocketImportError = (playlistId: number) => {
    const { playlist } = this.props;
    const { toasts } = this.state;

    if (playlist.id !== playlistId) {
      return;
    }

    const toast = {
      text: 'There was an error while importing playlist',
    };

    this.setState({
      toasts: [...toasts, toast],
    });
  }

  private handleSocketTrack = (playlistId: number, track: TrackInterface) => {
    const { playlist } = this.props;
    const { toasts } = this.state;

    if (playlist.id !== playlistId) {
      return;
    }

    const toast = {
      text: `New track! ${track.name}`,
    };

    this.props.setSingleTrack(playlistId, track);

    this.setState({
      toasts: [...toasts, toast],
    });
  }

  private handleSocketTracksAccepted = (playlistId: number) => {
    const { playlist } = this.props;
    const { toasts } = this.state;

    if (playlist.id !== playlistId) {
      return;
    }

    const toast = {
      text: `Your tracks are being processed. They will appear on your list soon`,
    };

    this.setState({
      toasts: [...toasts, toast],
    });
  }

  private handleSocketTrackRemoved = (playlistId: number, track: TrackInterface) => {
    const { playlist } = this.props;
    const { toasts } = this.state;

    if (playlist.id !== playlistId) {
      return;
    }

    const toast = {
      text: `Track ${track.name} removed from playlist`,
    };

    this.setState({
      toasts: [...toasts, toast],
    });

    this.props.removePlaylistTrack(playlistId, track.id);
  }

  componentDidMount() {
    this.io = io({
      query: { token: getUserToken() },
      autoConnect: false,
    });

    this.io.connect();

    this.io.on('connect', this.handleSocketConnection);
    this.io.on('tracks-accepted', this.handleSocketTracksAccepted);
    this.io.on('track', this.handleSocketTrack);
    this.io.on('import-error', this.handleSocketImportError);
    this.io.on('track-removed', this.handleSocketTrackRemoved);
  }

  componentWillUnmount() {
    this.io.removeAllListeners();
    this.io.close();
  }

  handleDismiss = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  render() {
    const { errorCode, playlist } = this.props;

    if (errorCode) {
      return <Error statusCode={errorCode} />;
    }

    return (
      <Fragment>
        <PlaylistViewContainer playlistId={playlist.id} />
        <Snackbar
          toasts={this.state.toasts}
          onDismiss={this.handleDismiss}
          autohideTimeout={2000}
          autohide
        />
      </Fragment>
    );
  }
}

const actionCreators = {
  setSinglePlaylist,
  setSingleTrack,
  removePlaylistTrack,
  fetchTracksSuccess,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(PlaylistViewPage);
