import debug from 'debug';
import errorhandler from 'errorhandler';
import { Server } from 'http';
import createConnection from '@server/database';
import createApp from '@server/createApp';
import io from '@server/io';
import isProduction from '@server/utils/isProduction';
import createNextApp from '@next/index';

(async () => {
  await createConnection();
  const app = createApp();

  createNextApp().then((nextApp) => {
    app.use(nextApp);
  });

  if (!isProduction()) {
    app.use(errorhandler());
  }

  const port = process.env.PORT || 8000;
  const server = new Server(app);
  io.attach(server);

  const listener = server.listen(port);

  listener.on('error', error => debug('app:error')(error));
  listener.on('listening', () => {
    const info = debug('app:info');
    info('App is running on port %d', port);
    info('App environment is %s', process.env.NODE_ENV);
  });
})();
