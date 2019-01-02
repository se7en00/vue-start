import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

import menu from './menu'
import account from './account'
import basicSetting from './basicSetting'
import getters from './getters'// Vuex 依赖 Promise
Vue.use(Vuex)
const storeTree = {
    getters,
    modules: {
        menu,
        account,
        basicSetting
    }
}

if (process.env.NODE_ENV === 'development') {
    Object.assign(storeTree, { plugins: [createLogger()] })
}

const store = new Vuex.Store({ ...storeTree })

export default store
