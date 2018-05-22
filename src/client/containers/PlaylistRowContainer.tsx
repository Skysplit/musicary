import { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { PlaylistInterface } from '@client/store/playlist';
import PlaylistRow from '@client/components/PlaylistRow';
import { removePlaylist, setPlaylist } from '@client/store/playlist/operations';
import client from '@client/utils/client';
import { State } from '@client/store';
import { getIsPlaylistRemoving } from '@client/store/playlist/selectors';

export interface PlaylistRowContainerProps {
  playlist: PlaylistInterface;
}

type ComponentProps = PlaylistRowContainerProps & {
  isRemoving: boolean;
  removePlaylist: typeof removePlaylist;
  setPlaylist: typeof setPlaylist;
};

type ComponentState = {
  edit: boolean;
};

export class PlaylistRowContainer extends PureComponent<ComponentProps, ComponentState> {
  state = {
    edit: false,
  };

  handleEditStart = () => this.setState({
    edit: true,
  })

  handleEditCancel = () => this.setState({
    edit: false,
  })

  handleSave = async (playlist: PlaylistInterface) => {
    const savedPlaylist = {
      ...this.props.playlist,
      ...playlist,
    };

    const response = await client.put(`/playlists/${savedPlaylist.id}`, savedPlaylist);
    return response.data as PlaylistInterface;
  }

  handleSaved = (playlist: PlaylistInterface) => {
    this.props.setPlaylist(playlist);
    this.handleEditCancel();
  }

  handleRemove = (playlist: PlaylistInterface) => this.props.removePlaylist(playlist.id);

  render() {
    const { edit } = this.state;
    const { isRemoving, ...props } = this.props;

    return (
      <PlaylistRow
        {...props}
        edit={edit}
        removing={isRemoving}
        onEditStart={this.handleEditStart}
        onEditCancel={this.handleEditCancel}
        onRemove={this.handleRemove}
        onSave={this.handleSave}
        onSaved={this.handleSaved}
      />
    );
  }
}

const actionCreators = {
  removePlaylist,
  setPlaylist,
};

const mapStateToProps = (state: State, props: ComponentProps) => ({
  isRemoving: getIsPlaylistRemoving(state, { id: props.playlist.id }),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistRowContainer);
