import next from 'next';
import path from 'path';
import isProduction from '@server/utils/isProduction';
import router from './routes';

const dev = !isProduction();
const dir = path.resolve(__dirname, '..', 'client');
const app = next({ dev, dir });
const handleRequest = router.getRequestHandler(app);

export default async () => {
  await app.prepare();
  return handleRequest;
};
