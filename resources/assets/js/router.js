import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = require('./components/routes/Home.vue')
const NotFound = require('./components/routes/NotFound.vue')
const Login = require('./components/routes/Login.vue')
const Register = require('./components/routes/Register.vue')

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '*',
            component: NotFound
        },
    ]
})

module.exports = router;
