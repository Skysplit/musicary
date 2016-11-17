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
    </head>
    <body>
        <div id="app">
            <div class="container">
                <div v-if="appReady">
                    <router-view></router-view>
                </div>
                <div v-else>
                    Page loading
                </div>
            </div>
        </div>
        <script src="{!! asset('js/app.js') !!}"></script>
    </body>
</html>
