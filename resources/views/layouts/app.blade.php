<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Page title</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{!! asset('css/app.css') !!}" type="text/css">
    <script type="text/javascript">
    /* eslint indent: ["error", 4] */
    window.Laravel = {
        csrfToken: '{{ csrf_token() }}',
        config: {
            name: '{{ config("app.name") }}',
        },
    };
    </script>
    @stack('styles')
</head>
<body>
    @yield('content')
    <script src="{!! asset('js/manifest.js') !!}"></script>
    <script src="{!! asset('js/vendor.js') !!}"></script>
    <script src="{!! asset('js/index.js') !!}"></script>
    @stack('scripts')
</body>
</html>
