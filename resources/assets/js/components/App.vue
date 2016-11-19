<script>
const store = require('../store')

module.exports = {
    store,
    router,
    data() {
        return {
        }
    },
    created() {
        this.$auth.commit('ready')
    }
}
</script>
