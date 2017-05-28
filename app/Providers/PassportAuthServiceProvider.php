<?php

namespace App\Providers;

use Dingo\Api\Auth\Provider\Authorization;
use Dingo\Api\Routing\Route;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class PassportAuthServiceProvider extends Authorization
{
    /**
     * @var \Illuminate\Contracts\Auth\Guard
     */
    protected $auth = null;

    /**
     * @var string
     */
    protected $guard = 'api';

    /**
     * @param AuthManager $auth
     */
    public function __construct(AuthManager $auth)
    {
        $this->auth = $auth->guard($this->guard);
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request, Route $route)
    {
        $user = $this->auth->user();

        if ($user === null) {
            throw new UnauthorizedHttpException(
                get_class($this),
                'Unable to authenticate with ivalid API key and token'
            );
        }

        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthorizationMethod()
    {
        return 'bearer';
    }
}
