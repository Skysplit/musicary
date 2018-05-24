import { PureComponent, MouseEvent } from 'react';
import { ListItem, FontIcon } from 'react-md';
import { TrackInterface } from '@client/store/track';
import { PlaylistInterface } from '@client/store/playlist';
import client from '@client/utils/client';

type TrackProps = {
  track: TrackInterface;
  playlist: PlaylistInterface;
  active: boolean;
  onClick: (track: TrackInterface) => any;
};

export default class Track extends PureComponent<TrackProps> {
  handleClick = () => this.props.onClick(this.props.track);

  removeTrack = async (e: MouseEvent<any>) => {
    e.stopPropagation();

    const { track, playlist } = this.props;
    const confirmed = confirm(`Are you sure you want to remove ${track.name} from this playlist?`);

    if (!confirmed) {
      return;
    }

    try {
      await client.delete(`/playlists/${playlist.id}/tracks/${track.id}`);
    } catch (err) {
      // Gotta catch 'em all
    }
  }

  renderActiveIcon = () => (
    this.props.active ? <FontIcon>play_arrow</FontIcon> : null
  )

  renderRemoveIcon = () => this.props.active ? (
    null
  ) : (
    <FontIcon onClick={this.removeTrack}>
      delete
    </FontIcon>
  )

  render() {
    const { track, active } = this.props;

    return (
      <ListItem
        onClick={this.handleClick}
        primaryText={track.name}
        leftIcon={this.renderActiveIcon()}
        rightIcon={this.renderRemoveIcon()}
        active={active}
      />
    );
  }
}
