import React, { PureComponent, MouseEvent } from 'react';
import { PlaylistInterface } from '@client/store/playlist';
import { Grid, Cell, Button } from 'react-md';
import Link from '@next/link';

interface PlaylistItemProps {
  playlist: PlaylistInterface;
  removing: boolean;
  onRemove: (playlist: PlaylistInterface) => any;
  onEdit: () => any;
}

export default class PlaylistItem extends PureComponent<PlaylistItemProps> {
  handleRemove = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const { onRemove, playlist } = this.props;
    const confirmed = confirm(`Are you sure you want to remove playlist ${playlist.name}?`);

    if (confirmed) {
      onRemove(this.props.playlist);
    }
  }

  handleEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onEdit();
  }

  render() {
    const { playlist, removing } = this.props;

    return (
      <Link route="playlist" params={{ id: playlist.id }}>
        <Grid gutter={0} spacing={0} noSpacing style={{ cursor: 'pointer' }}>
          <Cell phoneSize={3} tabletSize={6} desktopSize={11} align="middle">
            <span className="md-title">
              {playlist.name}
            </span>
          </Cell>
          <Cell phoneSize={1} tabletSize={2} desktopSize={1} style={{ textAlign: 'right' }}>
            <Button
              className="edit"
              icon
              primary
              onClick={this.handleEdit}
              disabled={removing}
            >
              edit
            </Button>{' '}
            <Button
              icon
              secondary
              onClick={this.handleRemove}
              disabled={removing}
              className="remove"
            >
              delete
            </Button>
          </Cell>
        </Grid>
      </Link>
    );
  }
}
