require('dotenv').config();

const { mix } = require('laravel-mix');
const { parse } = require('url');

mix
  .react('resources/assets/js/index.js', 'public/js')
  .extract([
    'axios',
    'history',
    'lodash',
    'prop-types',
    'react-dom',
    'react-md',
    'react-redux',
    'react-router-dom',
    'react-router-redux',
    'react-router',
    'react',
    'redux-form',
    'redux-observable',
    'redux-thunk',
    'redux',
    'reselect',
    'rxjs',
  ])
  .sass('resources/assets/sass/app.scss', 'public/css')
  .browserSync({
    notify: false,
    proxy: {
      target: parse(process.env.APP_URL).host || 'homestead.app',
      reqHeaders() {
        return {
          host: 'localhost:3000',
        };
      },
    },
  })
  .disableNotifications();
