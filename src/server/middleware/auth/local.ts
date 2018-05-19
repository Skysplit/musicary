import passport from 'passport';
import { RequestHandler } from 'express';
import { Strategy, IStrategyOptions } from 'passport-local';
import { get } from 'lodash';
import User from '@server/module/user/user.model';
import { verifyPassword } from '@server/utils/password';
import createJWT from '@server/utils/createJWT';
import isProduction from '@server/utils/isProduction';

const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
};

passport.use(
  new Strategy(strategyOptions, async (email, password, done) => {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false);
    }

    if (verifyPassword(password, user.password)) {
      return done(null, user);
    }

    // Password is not valid
    return done(null, false);
  }),
);

const local: RequestHandler = (req, res, next) => (
  passport.authenticate('local', (err, user: User, info) => {
    if (err) {
      return res.status(500).json({
        message: 'There was an error while performing request',
        error: isProduction ? undefined : err,
      });
    }

    if (!user) {
      return res.status(422).json({
        errors: {
          email: get(info, 'message', 'Incorrect credentials'),
          password: get(info, 'message', 'Incorrect credentials'),
        },
      });
    }

    return res.json({
      user,
      success: true,
      token: createJWT(user.toJSON()),
    });
  })(req, res, next)
);

export default local;
