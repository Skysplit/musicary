<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api->version('v1', function ($api) {
    $api->group(['namespace' => $this->namespace.'\Api\V1'], function ($api) {
        $api->group(['middleware' => ['api.auth', 'api.throttle']], function ($api) {
            $api->get('me', 'UserController@me');
        });
    });
});
