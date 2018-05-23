import { Router } from 'express';
import { validate } from 'class-validator';
import { isEmpty, get } from 'lodash';
import * as auth from '@server/middleware/auth';
import { UserRequest } from '@server/module/user/user.router';
import Playlist from '@server/module/playlist/playlist.model';
import mapErrors from '@server/utils/mapModelErrors';
import trackRouter from './track/track.router';

export interface PlaylistRequest extends UserRequest {
  playlist?: Playlist;
}

const router = Router();

// Auth route using JWT token
router.use(auth.jwt);

// Add tracks subroute
router.use('/:id/tracks', trackRouter);

// Find playlist based on param
router.param('id', async (req: PlaylistRequest, res, next, id: number) => {
  const playlist = await Playlist.findOne(id, {
    where: { user: req.user },
  });


  if (playlist) {
    req.playlist = playlist;
    return next();
  }

  res.status(404);
  return next(new Error('Playlist not found'));
});

// Get playlists list
router.get('/', async (req: PlaylistRequest, res) => {
  const playlists = await Playlist.find({
    where: { user: req.user },
  });

  res.json(playlists);
});

// Create playlist
router.post('/', async (req: PlaylistRequest, res) => {
  const lastPlaylist = await Playlist.findOne({
    where: { user: req.user },
    order: { position: -1 },
  });

  const playlist = Playlist.create({
    position: get(lastPlaylist, 'position', 0) + 1,
    user: req.user,
    name: req.body.name,
  });

  const errors = await validate(playlist);

  if (isEmpty(errors)) {
    return res.json(await playlist.save());
  }

  return res.status(422).json(mapErrors(errors));
});

// Remove playlist
router.delete('/:id', async (req: PlaylistRequest, res) => {
  res.json(await req.playlist.remove());
});

// Update playlist
router.put('/:id', async (req: PlaylistRequest, res) => {
  const playlist = req.playlist;
  const { name, position } = req.body;

  Object.assign(playlist, {
    name,
    position: position || playlist.position,
  });

  const errors = await validate(playlist);

  if (isEmpty(errors)) {
    return res.json(await playlist.save());
  }

  return res.status(422).json(mapErrors(errors));
});

// Get playlist
router.get('/:id', async (req: PlaylistRequest, res) => {
  res.json(req.playlist);
});

export default router;
