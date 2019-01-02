import * as TYPES from './mutationTypes'

export default {
    [TYPES.LOGOUT](state) {
        state.user = null
    },

    [TYPES.SET_LOGIN_USER](state, payload) {
        state.username = payload
    },

    [TYPES.SET_CURRENT_MERCHANT_LIST](state, payload) {
        state.merchantList = payload
    }
}
