import { PureComponent, Fragment } from 'react';
import { Divider, Card, CardTitle } from 'react-md';
import { PlaylistInterface } from '@client/store/playlist';
import { TrackInterface } from '@client/store/track';
import TrackFormContainer from '@client/containers/TrackFormContainer';
import Tracklist from '@client/components/Tracklist';

export interface PlaylistViewProps {
  playlist: PlaylistInterface;
  tracks: TrackInterface[];
  playlistId: number;
}

export default class PlaylistView extends PureComponent<PlaylistViewProps> {
  render() {
    const { playlist, tracks } = this.props;

    return (
      <Fragment>
        <Card>
          <CardTitle title={playlist.name} />
          <Tracklist tracks={tracks} playlist={playlist} />
        </Card>

        <Divider style={{ margin: '10px 0' }} />

        <Card style={{ padding: '0 20px 20px' }}>
          <CardTitle title="Add tracks" />
          <TrackFormContainer playlist={playlist} />
        </Card>
      </Fragment>
    );
  }
}
