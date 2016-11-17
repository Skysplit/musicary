<template lang="html">
    <form class="form-horizontal" id="login-form" @submit.prevent="login">
        <form-group :errors="errors.email">
            <label slot="label" for="email" class="control-label col-md-3">
                E-mail
            </label>

            <input
                slot="input"
                type="text"
                name="email"
                id="email"
                class="form-control"
                v-model="data.email">
        </form-group>
        <form-group :errors="errors.password">
            <label slot="label" for="password" class="control-label col-md-3">
                Password
            </label>
            <input
                slot="input"
                type="password"
                name="password"
                id="password"
                class="form-control"
                v-model="data.password">
        </form-group>

        <form-group>
            <div slot="label" class="col-md-3"></div>
            <div slot="input" class="checkbox">
                <label>
                    <input type="checkbox" name="remember" v-model="data.remember" :true-value="1" :false-value="null">
                    Remember me
                </label>
            </div>
        </form-group>

        <div class="form-group">
            <div class="col-md-push-3 col-md-9">
                <button type="submit" class="btn btn-primary">
                    Log in
                </button>
            </div>
        </div>
    </form>
</template>

<script>
module.exports = {
    data() {
        return {
            data: {
                email: '',
                password: '',
                remember: null,
            },
            submitting: false,
            errors: {},
        }
    },
    methods: {
        login() {
            this.submitting = true;

            this.$http
                .post('login', this.data)
                .then(this.handleSuccess, this.handleError)
        },
        handleResponse(res) {
            this.submitting = false;
            this.errors = {};
        },
        handleSuccess(res) {
            this.handleResponse(res);

            if (! res.body.success) {
                this.$store.commit('logout');

                return;
            }

            this.$store.commit({
                type: 'login',
                user: res.body.user,
            });

            this.$router.push(res.body.redirectTo);
        },
        handleError(res) {
            this.handleResponse(res);

            if (res.status === 422) {
                this.errors = res.body;
            }
        }
    }
}
</script>
