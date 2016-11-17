<script>
const router = require('../router')
const store = require('../store')

module.exports = {
    store,
    router,
    data() {
        return {
            appReady: false
        }
    },
    created() {
        let handleResponse = function (res) {
            this.appReady = true
        }

        let handleSuccess = function (res) {
            this.$store.commit({
                type: 'login',
                user: res.body.user,
            })

            handleResponse.call(this, res)
        }

        let handleError = function (res) {
            this.$store.commit({
                type: 'logout'
            })

            handleResponse.call(this, res)
        }

        this.$http
            .get('api/me')
            .then(handleSuccess, handleError);
    }
}
</script>
