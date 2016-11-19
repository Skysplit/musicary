import Vuex from 'vuex'

module.exports = new Vuex.Store({
    state: {
        ready: false,
        csrfToken: window.Laravel.csrfToken,
    },
    mutators: {
        ready(state) {
            state.ready = true
        }
    }
})
