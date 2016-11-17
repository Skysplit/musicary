
// Expose lodash
window._ = require('lodash')

// Expose jQuery
window.$ = window.jQuery = require('jquery')

// Import bootstrap (it adds itself to jQuery plugins)
require('bootstrap-sass')

// Expose vue
window.Vue = require('vue')

// Require vue-resource package (for http requests)
require('vue-resource')

// Intercept http request
Vue.http.interceptors.push((request, next) => {
    // Add csrf token header so
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken)

    // Add accept header so we can consume api
    request.headers.set('Accept', 'application/vnd.musicary.v1+json')

    // Proceed request
    next()
})

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
