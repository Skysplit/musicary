@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <ul class="nav navbar-nav">
                <li>
                    {!! link_to('/', trans('app.home')) !!}
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                @if (auth()->guest())

                    <li>
                        {!! link_to('login', trans('app.login')) !!}
                    </li>
                    <li>
                        {!! link_to('register', trans('app.register')) !!}
                    </li>
                @else
                    <li class="dropdown">
                        <a href="javascript:void;" class="dropdown-toggle" data-toggle="dropdown">
                            {{ auth()->user()->name }}
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <a href="#">Settings</a>
                            </li>
                            <li>
                                <a href="#">Log out</a>
                            </li>
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </nav>
@endsection
