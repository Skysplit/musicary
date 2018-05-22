import { Router } from 'express';
import { PlaylistRequest } from '@server/module/playlist/playlist.router';
import Track from '@server/module/playlist/track/track.model';

const router = Router();

interface TrackRequest extends PlaylistRequest {
  track?: Track;
}

router.get('/', async (req: PlaylistRequest, res) => {
  res.send(await req.playlist.tracks);
});

router.put('/:id', async (req: TrackRequest, res) => {
  res.send('Edit track');
});

router.post('/', async (req, res) => {
  res.send('Create tracks');
});

router.delete('/:id', async (req: TrackRequest, res) => {
  res.send('Delete track');
});

export default router;
