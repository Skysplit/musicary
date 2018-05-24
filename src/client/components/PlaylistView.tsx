import { PureComponent, Fragment } from 'react';
import { Divider, Card, CardTitle, CardText } from 'react-md';
import { isEmpty } from 'lodash';
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

          <CardText>
            {isEmpty(tracks) && (
              <h2>You do not have any tracks on this playlist yet</h2>
            )}
            <Tracklist tracks={tracks} playlist={playlist} />
          </CardText>
        </Card>

        <Divider style={{ margin: '10px 0' }} />

        <Card>
          <CardTitle title="Add tracks" />

          <CardText>
            <TrackFormContainer playlist={playlist} />
          </CardText>
        </Card>
      </Fragment>
    );
  }
}
