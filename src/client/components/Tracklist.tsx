import { PureComponent } from 'react';
import { List } from 'react-md';
import { TrackInterface } from '@client/store/track';
import Track from '@client/components/Track';

type TracklistProps = {
  tracks: TrackInterface[];
};

export default class Tracklist extends PureComponent<TracklistProps> {
  render() {
    const { tracks } = this.props;

    return (
      <List>
        {tracks.map(track => (
          <Track key={track.id} track={track} />
        ))}
      </List>
    );
  }
}
