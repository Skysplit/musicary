module.exports = (Vue, options) => {
    Vue.prototype.$auth = (() => {
        console.dir(Vue)
        console.log(this, options)

        return {}
    })()
}
