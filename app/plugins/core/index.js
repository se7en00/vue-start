// Element
import ElementUI from 'element-ui'
// import Vuelidate from 'vuelidate' // 表单验证
import utils from '@/utils'
// import pdf from 'vue-pdf'
// 组件
import '@/components'

// 功能插件
import pluginError from '@/plugins/error'
import pluginLog from '@/plugins/log'

export default {
    async install(Vue, options) {
        // Element
        Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })
        // Vue.use(Vuelidate)
        // 插件
        Vue.use(pluginError)
        Vue.use(pluginLog)

        // 设置为 false 以阻止 vue 在启动时生成生产提示。
        // https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false
        // 当前商户
        Vue.prototype.$currentMerchantId = ''
        Vue.prototype.$merchantList = []

        Vue.prototype.$mappingValue = utils.helps.mappingValue
        Vue.prototype.$fMoney = utils.helps.formatMoney
        // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV
        // 当前的 baseUrl
        // 简化代码中 process.env.BASE_URL 取值
        Vue.prototype.$baseUrl = process.env.BASE_URL
        // 当前API地址
        Vue.prototype.$appAPI = process.env.VUE_APP_API || process.env.VUE_LOCAL_APP_API
        // Day.js https://github.com/iamkun/dayjs#readme
        Vue.prototype.$dayjs = dayjs

        // Vue.prototype.$pdf = pdf
    }
}
