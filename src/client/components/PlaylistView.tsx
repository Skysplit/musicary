import { PureComponent, Fragment } from 'react';
import { PlaylistInterface } from '@client/store/playlist';
import { TrackInterface } from '@client/store/track';
import TrackFormContainer from '@client/containers/TrackFormContainer';

interface ComponentProps {
  playlist: PlaylistInterface;
  tracks: TrackInterface[];
}

export default class PlaylistView extends PureComponent<ComponentProps> {
  render() {
    const { playlist, tracks } = this.props;

    return (
      <Fragment>
        <h1>{playlist.name}</h1>

        <TrackFormContainer />
      </Fragment>
    );
  }
}
