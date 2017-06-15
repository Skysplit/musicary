<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Illuminate\Contracts\Auth\Factory as AuthManager;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use League\Fractal\Serializer\JsonApiSerializer;
use Spatie\Fractal\Fractal;

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
            ->transformWith(new UserTransformer())
            ->serializeWith(new JsonApiSerializer())
            ->respond(201);
    }

    /**
     * {@inheritdoc}
     */
    protected function guard()
    {
        return $this->auth->guard();
    }
}
