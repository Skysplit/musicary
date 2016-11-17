
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

// Register global components
Vue.component('form-group', require('./components/FormGroup.vue'))

// Instantiate app
const app = new Vue(require('./components/App.vue')).$mount('#app')
