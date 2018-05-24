import {  connect } from 'react-redux';
import { getPlaylistData, getPlaylistTracks } from '@client/store/playlist/selectors';
import PlaylistView, { PlaylistViewProps } from '@client/components/PlaylistView';
import { State } from '@client/store';

const mapStateToProps = (state: State, props: PlaylistViewProps) => ({
  playlist: getPlaylistData(state, { id: props.playlistId }),
  tracks: getPlaylistTracks(state, { id: props.playlistId }),
});

export default connect(mapStateToProps)(PlaylistView);
