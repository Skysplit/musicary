import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { PlaylistRequest } from '@server/module/playlist/playlist.router';
import Track from '@server/module/playlist/track/track.model';
import mapErrors from '@server/utils/mapRequestErrors';
import saveTracks from '@server/module/playlist/track/saveTracks';
import io from '@server/io';

const router = Router();

interface TrackRequest extends PlaylistRequest {
  track?: Track;
}

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
      host_whitelist: ['youtu.be', 'youtube.com'],
      protocols: ['http', 'https'],
    })
    .withMessage('You must paste youtube URL'),
  async (req: PlaylistRequest, res) => {
    const { playlist, user, body } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(
        mapErrors(errors.array({ onlyFirstError: true }) as any),
      );
    }

    res.status(202).send();

    const userChannel = io.to(`${user.id}`);

    try {
      await saveTracks(body.url, playlist, userChannel);
    } catch (err) {
      userChannel.emit('import-error', playlist.id);
    }
  },
);

router.delete('/:id', async (req: TrackRequest, res) => {
  res.send('Delete track');
});

export default router;
