import { Router } from 'express';
import userRouter from '@server/module/user/user.router';
import playlistRouter from '@server/module/playlist/playlist.router';

const router = Router();

router.use('/users', userRouter);
router.use('/playlists', playlistRouter);

export default router;
