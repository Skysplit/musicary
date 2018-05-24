import { PureComponent, Fragment } from 'react';
import { Card, CardTitle, CardText, Divider } from 'react-md';
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
        <Card>
          <CardTitle title="My playlists" />
          <CardText>
            {isEmpty(playlists) && (
              <h3>
                You have no playlists saved yet!
              </h3>
            )}

            {playlists.map(playlist => (
              <PlaylistRowContainer key={playlist.id} playlist={playlist} />
            ))}
          </CardText>
        </Card>

        <Divider style={{ margin: '10px 0' }} />

        <Card>
          <CardTitle title="Add new playlist" />
          <CardText>
            <PlaylistFormContainer
              onCancel={onFormCancel}
              onSave={onFormSave}
              onSaved={onFormSaved}
            />
          </CardText>
        </Card>
      </Fragment>
    );
  }
}
