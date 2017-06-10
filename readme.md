# Musicary

[![Build Status](https://travis-ci.org/Skysplit/musicary.svg?branch=master)](https://travis-ci.org/Skysplit/musicary)

# Requirements

- PHP 7.1
- Composer
- Laravel framework requirements
- Node 6+
- npm 5.0.0+

# Installation

Copy `.env.example` to `.env` and set up your environment variables

```bash
$ composer install
$ yarn
$ php artisan migrate
$ php artisan passport:install
$ php artisan db:seed
$ yarn production
```

# Used technologies

- PHP 7.1
- Redis
- NodeJS
- MySQL-compliant database (e.g. MariadB)

### Development technologies

- BabelJS with **ES2015**, **React** and **stage0** presents
- SASS

### Used libraries/frameworks

- Laravel 5.4 framework
- Dingo API
- Laravel Echo Server
- Socket.IO
- React
- Redux
