<template lang="pug">
form.form-horizontal#register-form(@submit.prevent="register")
    div.form-group
        label.control-label.col-md-4(for="name") Name
        div.col-md-8
            input.form-control#name(type="text", placeholder="Name", v-model="name")
    div.form-group
        label.control-label.col-md-4(for="email") Email
        div.col-md-8
            input.form-control#email(type="text", placeholder="E-mail", v-model="email")
    div.form-group
        label.control-label.col-md-4(for="password") Password
        div.col-md-8
            input.form-control#password(type="password", v-model="password")
    div.form-group
        label.control-label.col-md-4(for="password_confirmation") Confirm password
        div.col-md-8
            input.form-control#password_confirmation(type="password", v-model="password_confirmation")
    div.form-group
        button.btn.btn-primary(type="submit") Submit
</template>

<script>
module.exports = {

    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            errors: {}
        }
    },
    methods: {
        register() {
            this.errors = {}

            var {name, email, password, password_confirmation} = this
            var data = {name, email, password, password_confirmation}

            this.$http.post('register', data).then(this.handleSuccess, this.handleError)
        },
        handleSuccess(res) {
            console.log(res)
        },
        handleError(res) {
            if (res.status === 422) {
                return this.$set(this, 'errors', res.body)
            }
        }
    }
}
</script>
