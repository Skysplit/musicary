import { flow, map, filter } from 'lodash/fp';
import Playlist from '@server/module/playlist/playlist.model';
import { google } from 'googleapis';
import Track from '@server/module/playlist/track/track.model';

const getVideoId = (url: string) => {
  /* tslint:disable-next-line:max-line-length */
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([^\?&"'>]+)/i;
  const [, videoId] = url.match(regex);
  return videoId;
};

const getVideoData = async (videoId: string[]) => {
  const key = process.env.YOUTUBE_API_KEY;

  const response = await google.youtube('v3').videos.list({
    auth: key,
    id: videoId.join(','),
    part: 'snippet',
  });

  return response.data.items;
};

const saveTracks = async (videoIds: string[], playlist: Playlist, channel: SocketIO.Namespace) => {
  // Process videos in background
  const videoIdList: string[] = flow([
    map(getVideoId),
    filter(id => !!id),
  ])(
    videoIds,
  );

  const videoList = await getVideoData(videoIdList);

  videoList.map(async (video) => {
    const params = {
      sourceId: video.id,
      sourceType: Track.Source.youtube,
    };

    let track = await Track.findOne(params, {
      relations: ['playlists'],
    });

    track = track || Track.create(params);

    track.name = video.snippet.title;
    track.metadata = JSON.stringify(video.snippet);
    track.playlists = (track.playlists || []).concat(playlist);

    await track.save();

    channel.emit('track', playlist.id, track);
  });
};

export default saveTracks;

