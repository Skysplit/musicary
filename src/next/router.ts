import Router from 'next-routes';

const router = new Router();

router.add('home', '/', 'home');
router.add('login', '/login', 'user/login');
router.add('signup', '/signup', 'user/signup');
router.add('playlist', '/playlist/:id', 'playlist');

export default router;
