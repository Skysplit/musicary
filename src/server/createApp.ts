import express from 'express';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import routes from './routes';

const createApp = () => {
  const app = express();

  // App settings
  app.disable('x-powered-by');

  // Global middleware
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(passport.initialize());

  // Mount routes
  app.use(routes);

  return app;
};

export default createApp;
