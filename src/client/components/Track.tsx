import { PureComponent } from 'react';
import { TrackInterface } from '@client/store/track';
import { ListItem } from 'react-md';

type TrackProps = {
  track: TrackInterface;
};

export default class Track extends PureComponent<TrackProps> {
  render() {
    const { track } = this.props;

    return (
      <ListItem
        primaryText={track.name}
      />
    );
  }
}
