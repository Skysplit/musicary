import { PureComponent, Fragment } from 'react';
import { first, findIndex, reject, sample } from 'lodash';
import { List, Grid, Cell, Button } from 'react-md';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  HookProvided,
} from 'react-beautiful-dnd';
import ReactPlayer from 'react-player';
import { TrackInterface } from '@client/store/track';
import { PlaylistInterface } from '@client/store/playlist';
import Track from '@client/components/Track';

type TracklistProps = {
  tracks: TrackInterface[];
  playlist: PlaylistInterface;
};

type TracklistState = {
  currentTrack: TrackInterface | null;
  autoplay: boolean;
  shuffle: boolean;
  repeat: boolean;
};

export default class Tracklist extends PureComponent<TracklistProps, TracklistState> {
  static getDerivedStateFromProps(
    nextProps: TracklistProps,
    prevState: TracklistState,
  ): TracklistState {
    const currentTrack = prevState.currentTrack || first(nextProps.tracks);

    return {
      ...prevState,
      currentTrack,
    };
  }

  state: TracklistState = {
    currentTrack: null,
    autoplay: false,
    shuffle: true,
    repeat: true,
  };

  componentDidMount() {
    this.setState({ autoplay: true });
  }

  handleDragEnd = (result: DropResult, hook: HookProvided) => {
    // Add support for drag & drop
  }

  handleTrackClick = (track: TrackInterface) => {
    this.setState({ currentTrack: track });
  }

  private pickRandomTrack() {
    const { tracks } = this.props;
    const { currentTrack } = this.state;

    if (tracks.length === 1) {
      return first(tracks);
    }

    const availableTracks = reject(tracks, {
      id: currentTrack.id,
    });

    return sample(availableTracks);
  }

  private findTrackIndex = (track: TrackInterface) => (
    findIndex(this.props.tracks, { id: track.id })
  )

  toggleShuffle = () => this.setState(({ shuffle }) => ({
    shuffle: !shuffle,
  }))

  toggleRepeat = () => this.setState(({ repeat }) => ({
    repeat: !repeat,
  }))

  playPrevious = () => {
    const { tracks } = this.props;
    const currentIndex = this.findTrackIndex(this.state.currentTrack);

    if (currentIndex === 0) {
      return;
    }

    this.setState({
      currentTrack: tracks[currentIndex - 1],
    });
  }

  playNext = () => {
    const { tracks } = this.props;
    const { currentTrack, repeat, shuffle } = this.state;
    const currentIndex = this.findTrackIndex(currentTrack);

    let nextTrack;

    // If it's last track on the list
    if (currentIndex === tracks.length - 1) {
      if (!repeat) {
        return;
      }

      // When shuffling is disabled, pick next track
      if (!shuffle) {
        nextTrack = first(tracks);
      }
    }

    // When shuffling is enabled, pick randm track
    if (shuffle) {
      nextTrack = this.pickRandomTrack();
    }

    // If next track was not picked, play next track
    nextTrack = nextTrack || tracks[currentIndex + 1];

    this.setState({
      currentTrack: nextTrack,
    });
  }

  render() {
    const { tracks, playlist } = this.props;
    const { currentTrack, autoplay, shuffle, repeat } = this.state;

    return (
      <Fragment>
        {currentTrack && global.window && (
          <Grid>
            <Cell phoneSize={4} tabletSize={8} desktopSize={6}>
              <ReactPlayer
                key={currentTrack.id}
                url={`https://www.youtube.com/watch?v=${currentTrack.sourceId}`}
                config={{
                  youtube: {
                    preload: true,
                    playerVars: { autoplay: autoplay ? 1 : 0 },
                  },
                }}
                onEnded={this.playPrevious}
                controls
              />
            </Cell>
            {tracks.length > 1 && (
              <Cell phoneSize={4} tabletSize={8} desktopSize={6}>
                <Button
                  primary
                  icon
                  onClick={this.playPrevious}
                  tooltipLabel="Play previos track"
                >
                  skip_previous
                </Button>
                <Button
                  primary
                  icon
                  onClick={this.playNext}
                  tooltipLabel="Play next track"
                >
                  skip_next
                </Button>
                <Button
                  primary
                  icon
                  onClick={this.toggleRepeat}
                  tooltipLabel={`Repeating is ${repeat ? 'enabled' : 'disabled'}`}
                >
                  {repeat ? 'repeat' : 'trending_flat'}
                </Button>
                <Button
                  primary
                  icon
                  onClick={this.toggleShuffle}
                  tooltipLabel={`Shuffling is ${shuffle ? 'enabled' : 'disabled'}`}
                >
                  {shuffle ? 'shuffle' : 'swap_vert'}
                </Button>
              </Cell>
            )}
          </Grid>
        )}

        <DragDropContext onDragEnd={this.handleDragEnd}>
            <List>
              <Droppable droppableId="playlist">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {tracks.map((track, index) => (
                      <Draggable key={track.id} draggableId={`${track.id}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Track
                              onClick={this.handleTrackClick}
                              active={track.id === currentTrack.id}
                              track={track}
                              playlist={playlist}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </List>
        </DragDropContext>
      </Fragment>
    );
  }
}
