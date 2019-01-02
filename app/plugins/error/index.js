import util from '@/utils'

export default {
    install(Vue, options) {
        // 如果是ajax异步请求，异常需要通过在catch中this.$throw()手动抛出， vue errorHandler api 会捕获到
        Vue.config.errorHandler = function(err, vm, info) {
            Vue.nextTick(() => {
                // todo 持久化erro log 信息
                // 只在开发模式下打印 log
                /* eslint-disable */
                if (process.env.NODE_ENV === 'development') {
                    util.log.capsule('商家中心', 'ErrorHandler', 'danger')
                    util.log.danger('>>>>>> 错误信息 >>>>>>')
                    console.log(info)
                    util.log.danger('>>>>>> Vue 实例 >>>>>>')
                    console.log(vm)
                    util.log.danger('>>>>>> Error >>>>>>')
                    console.log(err)
                }
            })
        }
    }
}
