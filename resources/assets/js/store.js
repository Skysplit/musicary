import Vuex from 'vuex'

module.exports = new Vuex.Store({
    state: {
        ready: false,
        csrfToken: window.Laravel.csrfToken,
    },
    getters: {
        auth(state) {
            return state.auth || null;
        }
    },
    mutations: {
        login(state, data) {
            state.auth = data.user;
        },
        logout(state) {
            state.auth = null;
        }
    }
})
