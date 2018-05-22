import { PureComponent, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { PlaylistListsContainerProps } from '@app/client/containers/PlaylistsListContainer';
import PlaylistRowContainer from '@app/client/containers/PlaylistRowContainer';
import PlaylistFormContainer from '@app/client/containers/PlaylistFormContainer';
import { PlaylistInterface } from '@client/store/playlist';

interface PlaylistsListProps extends PlaylistListsContainerProps {
  onFormCancel: () => any;
  onFormSave: (playlist: PlaylistInterface) => Promise<PlaylistInterface>;
  onFormSaved: (playlist: PlaylistInterface) => any;
}

export default class PlaylistsList extends PureComponent<PlaylistsListProps> {
  render() {
    const { playlists, onFormCancel, onFormSave, onFormSaved } = this.props;

    return (
      <Fragment>
        {isEmpty(playlists) && (
          <h3>
            You have no playlists saved yet!
          </h3>
        )}

        {playlists.map(playlist => (
          <PlaylistRowContainer key={playlist.id} playlist={playlist} />
        ))}

        <h1>Add new playlist</h1>

        <PlaylistFormContainer
          onCancel={onFormCancel}
          onSave={onFormSave}
          onSaved={onFormSaved}
        />
      </Fragment>
    );
  }
}
