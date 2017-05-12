<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Contracts\Factory as Socialite;
use League\Fractal\Serializer\JsonApiSerializer;
use Spatie\Fractal\Fractal;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * @var Socialite
     */
    protected $socialite;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Socialite $socialite)
    {
        $this->socialite = $socialite;

        $this->middleware('guest');
    }

    /**
     * Redirect user to service provider
     *
     * @param string $provider
     */
    public function redirectToProvider(string $provider)
    {
        return $this->socialite->driver($provider)->redirect();
    }

    /**
     * @param string $provider
     */
    public function handleProviderResponse(string $provider)
    {
        
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    protected function registered(Request $request, User $user)
    {
        return Fractal::create()
            ->item($user)
            ->transformWith(new UserTransformer)
            ->serializeWith(new JsonApiSerializer);
    }

    /**
     * Get validator for provider
     *
     * @param strng $provider
     */
    protected function providerValidator(string $provider)
    {
        return validator(compact('provider'), $this->providerRules());
    }

    /**
     * Get rules for provider validation
     *
     * @return array
     */
    protected function providerRules(): array
    {
        return [
            'provider' => [
                Rule::in([
                    'youtube',
                ]),
            ],
        ];
    }
}
