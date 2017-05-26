require('dotenv').config();

const { mix } = require('laravel-mix');
const { parse } = require('url');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .react('resources/assets/js/index.js', 'public/js')
  .extract([
    'react',
    'prop-types',
    'lodash',
    'redux',
    'redux-thunk',
    'react-dom',
    'react-router',
    'react-router-redux',
  ])
  .sass('resources/assets/sass/app.scss', 'public/css')
  .browserSync({
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
