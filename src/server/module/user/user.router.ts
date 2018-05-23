import { Router, Request } from 'express';
import * as auth from '@server/middleware/auth';
import User from '@server/module/user/user.model';

const router = Router();

export interface UserRequest extends Request {
  user: User;
}

router.post('/login', auth.local);

router.get(
  '/me',
  auth.jwt,
  (req: UserRequest, res) => {
    res.json(req.user);
  },
);

export default router;
