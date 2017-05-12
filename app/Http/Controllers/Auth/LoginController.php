<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use League\Fractal\Serializer\JsonApiSerializer;
use Spatie\Fractal\Fractal;
use Illuminate\Contracts\Auth\Factory as AuthManager;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * @var AuthManager
     */
    protected $auth;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AuthManager $auth)
    {
        $this->auth = $auth;

        $this->middleware('guest', ['except' => 'logout']);
    }

    /**
     * {@inheritdoc}
     */
    protected function authenticated(Request $request, $user)
    {
        return Fractal::create()
            ->item($user)
            ->transformWith(new UserTransformer)
            ->serializeWith(new JsonApiSerializer)
            ->respond(201);
    }

    /**
     * @inheritDoc
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $response = parent::sendFailedLoginResponse($request);

        return $this->sendJsonResponse($response);
    }

    /**
     * @inheritDoc
     */
    protected function sendLockoutResponse(Request $request)
    {
        $response = parent::sendLockoutResponse($request);

        return $this->sendJsonResponse($response);
    }

    /**
     * @param RedirectResponse $response
     *
     * @return \Illuminate\Http\RedirectResponse|JsonResponse
     */
    protected function sendJsonResponse(RedirectResponse $response)
    {
        $response = [
            'errors' => $response->getSession()->get('errors')->getBag('default')->getMessages(),
        ];

        return new JsonResponse($response, 422);
    }

    /**
     * @inheritDoc
     */
    protected function guard()
    {
        return $this->auth->guard();
    }
}
