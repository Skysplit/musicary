import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { compose } from 'recompose';
import { PureComponent } from 'react';
import PlaylistsList from '@client/components/PlaylistsList';
import { PlaylistInterface } from '@client/store/playlist';
import { State } from '@client/store';
import { getPlaylists } from '@client/store/playlist/selectors';
import { fetchManyPlaylists, setPlaylist } from '@client/store/playlist/operations';
import client from '@client/utils/client';

export interface PlaylistListsContainerProps {
  playlists: PlaylistInterface[];
}

interface ComponentProps extends PlaylistListsContainerProps {
  fetchManyPlaylists: typeof fetchManyPlaylists;
  setPlaylist: typeof setPlaylist;
}

interface ComponentState {}

class PlaylistsListContainer extends PureComponent<ComponentProps, ComponentState> {
  handleSave = async (playlist: PlaylistInterface) => {
    const response = await client.post('/playlists', playlist);
    return response.data as PlaylistInterface;
  }

  handleSaved = (playlist: PlaylistInterface) => {
    this.props.setPlaylist(playlist);
    this.hideForm();
  }

  showForm = () => this.setState({
    showForm: true,
  })

  hideForm = () => this.setState({
    showForm: false,
  })

  render() {
    const { playlists } = this.props;

    return (
      <PlaylistsList
        playlists={playlists}
        onFormSave={this.handleSave}
        onFormSaved={this.handleSaved}
        onFormCancel={this.hideForm}
      />
    );
  }
}

const mapStateToProps = (state: State) => ({
  playlists: getPlaylists(state),
});

const actionCreators = {
  fetchManyPlaylists,
  setPlaylist,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PlaylistsListContainer);
