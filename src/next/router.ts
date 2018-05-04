import Router from 'next-routes';

const router = new Router();

router.add('home', '/', 'home');
router.add('test', '/test', 'test');

export default router;
