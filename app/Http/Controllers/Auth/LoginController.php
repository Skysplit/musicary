<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;

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

    use AuthenticatesUsers {
        sendFailedLoginResponse as sendFailedLoginResponseTrait;
        sendLockoutResponse as sendLockoutResponseTrait;
    }

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    /**
     * {@inheritdoc}
     */
    protected function authenticated(Request $request, $user)
    {
        if ($request->wantsJson()) {
            return [
                'success' => true,
                'token' => csrf_token(),
                'user' => $user,
                'redirectTo' => $this->redirectPath(),
            ];
        }
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|JsonResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $response = $this->sendFailedLoginResponseTrait($request);

        if ($request->wantsJson()) {
            return $this->sendJsonResponse($response);
        }

        return $response;
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|JsonResponse
     */
    protected function sendLockoutResponse(Request $request)
    {
        $response = $this->sendLockoutResponseTrait($request);

        if ($request->wantsJson()) {
            return $this->sendJsonResponse($response);
        }

        return $response;
    }

    /**
     * @param RedirectResponse $response
     *
     * @return \Illuminate\Http\RedirectResponse|JsonResponse
     */
    protected function sendJsonResponse(RedirectResponse $response)
    {
        return new JsonResponse(
            $response->getSession()->get('errors')->getBag('default')->getMessages(),
            422
        );
    }
}
