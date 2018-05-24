import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { toNumber, find, reject } from 'lodash';
import { PlaylistRequest } from '@server/module/playlist/playlist.router';
import Track from '@server/module/playlist/track/track.model';
import mapErrors from '@server/utils/mapRequestErrors';
import saveTracks from '@server/module/playlist/track/saveTracks';
import io from '@server/io';

const router = Router();

interface TrackRequest extends PlaylistRequest {
  track?: Track;
}

router.param('id', async (req: TrackRequest, res, next, value) => {
  const tracks = await req.playlist.tracks;
  req.track = find(tracks, { id: toNumber(value) });

  if (req.track) {
    return next();
  }

  res.status(404);
  return next(new Error('Track not found in playlist'));
});

router.get('/', async (req: PlaylistRequest, res) => {
  const tracks = await req.playlist.tracks;
  res.json(tracks);
});

router.put('/:id', async (req: TrackRequest, res) => {
  res.send('Edit track');
});

router.post(
  '/',
  check('url.*')
    .isURL({
      host_whitelist: ['youtu.be', 'youtube.com', 'www.youtube.com', 'www.youtu.be'],
      protocols: ['http', 'https'],
    })
    .withMessage('You must paste youtube URL'),
  async (req: PlaylistRequest, res) => {
    const { playlist, user, body } = req;
    const errors = validationResult(req);
    const userChannel = io.to(`${user.id}`);

    if (!errors.isEmpty()) {
      return res.status(422).json(
        mapErrors(errors.array({ onlyFirstError: true }) as any),
      );
    }

    res.sendStatus(202);

    userChannel.emit('tracks-accepted', playlist.id);

    try {
      await saveTracks(body.url, playlist, userChannel);
    } catch (err) {
      userChannel.emit('import-error', playlist.id);
    }
  },
);

router.delete('/:id', async (req: TrackRequest, res) => {
  const { playlist, track } = req;
  const tracks = await playlist.tracks;
  res.sendStatus(202);

  // Get user channel
  const channel = io.to(`${req.user.id}`);

  /// Remove track and emit message
  playlist.tracks = reject(tracks, { id: track.id });

  // Save relation
  await playlist.save();

  // Send message to user
  channel.emit('track-removed', playlist.id, track);
});

export default router;
