import Router from 'next-routes';

const router = new Router();

router.add('home', '/', 'home');
router.add('login', '/login', 'user/login');
router.add('signup', '/signup', 'user/signup');
router.add('playlists', '/playlists', 'playlist/index');
router.add('playlist', '/playlists/:id', 'playlist/view');

export default router;
