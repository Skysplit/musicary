import { SFC } from 'react';
import PlaylistItem from '@client/components/PlaylistItem';
import PlaylistFormContainer from '@client/containers/PlaylistFormContainer';
import { PlaylistRowContainerProps } from '@client/containers/PlaylistRowContainer';
import { PlaylistInterface } from '@client/store/playlist';

interface PlaylistRowProps extends PlaylistRowContainerProps {
  edit: boolean;
  removing: boolean;
  onRemove: (playlist: PlaylistInterface) => any;
  onSave: (playlist: PlaylistInterface) => Promise<PlaylistInterface>;
  onSaved: (playlist: PlaylistInterface) => any;
  onEditStart: () => any;
  onEditCancel: () => any;
}

const PlaylistRow: SFC<PlaylistRowProps> = ({
  playlist,
  edit,
  removing,
  onEditStart,
  onEditCancel,
  onSave,
  onSaved,
  onRemove,
}) => {
  return edit ? (
    <PlaylistFormContainer
      playlist={playlist}
      onSave={onSave}
      onSaved={onSaved}
      onCancel={onEditCancel}
    />
  ) : (
    <PlaylistItem
      playlist={playlist}
      onEdit={onEditStart}
      onRemove={onRemove}
      removing={removing}
    />
  );
};



export default PlaylistRow;
