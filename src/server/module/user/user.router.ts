import { Router, Request } from 'express';
import * as auth from '@server/middleware/auth';
import User from '@server/module/user/user.model';
import { validate } from 'class-validator';
import { body, validationResult } from 'express-validator/check';
import mapErrors from '@server/utils/mapRequestErrors';
import createJWT from '@server/utils/createJWT';

const router = Router();

export interface UserRequest extends Request {
  user: User;
}

router.post(
  '/',
  async (req: UserRequest, res, next) => {
    const { email } = req.body;

    if (!email) {
      return next();
    }

    req.user = await User.findOne({
      where: { email },
    });

    next();
  },
  body('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Wrong email address')
    .custom((value, options) => {
      if (options.req.user) {
        throw new Error('Email is already taken');
      }

      return value;
    }),
  body('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 3 }),
  body('passwordConfirmation')
    .not().isEmpty().withMessage('Password confirmation is required')
    .custom((value, options) => {
      if (value !== options.req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return value;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    const user = User.create({
      email,
      password,
    });

    if (!errors.isEmpty()) {
      return res.status(422).send(
        mapErrors(errors.array() as any),
      );
    }

    await user.save();

    res.json({
      user,
      success: true,
      token: createJWT(user.toJSON()),
    });
  },
);

router.post('/login', auth.local);

router.get(
  '/me',
  auth.jwt,
  (req: UserRequest, res) => {
    res.json(req.user);
  },
);

export default router;
