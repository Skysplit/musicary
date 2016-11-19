<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Page title</title>
        <link rel="stylesheet" href="{!! asset('css/app.css') !!}" type="text/css">
        <script type="text/javascript">
            window.Laravel = {
                csrfToken: "{{ csrf_token() }}"
            }
        </script>
        @stack('styles')
    </head>
    <body>
        <div id="app">
            @yield('content')
        </div>
        <script src="{!! asset('js/app.js') !!}"></script>
        @stack('scripts')
    </body>
</html>
