<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;

class UserController extends Controller
{
    use Helpers;

    /**
     * Show current user data
     *
     * @param Request $request
     */
    public function me(Request $request)
    {
        return $this->response->item(
            $request->user(),
            new UserTransformer
        );
    }
}
