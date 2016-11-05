require('dotenv').config()

// require dependencies
const elixir = require('laravel-elixir')
const url = require('url')

require('laravel-elixir-vue-2')

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix
        .sass('app.scss')

    mix
        .webpack('app.js')

    mix
        .browserSync({
            proxy: url.parse(process.env['APP_URL'] || '').host || 'homestead.app'
        })
});
