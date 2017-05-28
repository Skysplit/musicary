<?php

namespace App\Http\Api\Throttle;

use Dingo\Api\Http\RateLimit\Throttle\Throttle;
use Illuminate\Container\Container;

/**
 * Custom app throttle.
 * It matches only requests made using OAuth tokens.
 * First party tokens are not limited.
 */
class OAuthThrottle extends Throttle
{
    /**
     * {@inheritdoc}
     */
    public function match(Container $container)
    {
        /** @var \Dingo\Api\Http\Request $request */
        $request = $container->make('request');

        /** @var \App\User|null $user */
        if (! $user = $request->user()) {
            return false;
        }

        // Get authenticated user token

        /** \Laravel\Passport\Token|\Laravel\Passport\TransientToken $token */
        $token = $user->token();

        // Check if token has client relation
        // If it does not, then it's safe to use it without throttling
        if ($token->transient()) {
            return false;
        }

        // Check if token client is first party application
        // If so, do not rate limit it
        if ($token->client->firstParty()) {
            return false;
        }

        // Throttle request
        return true;
    }
}
