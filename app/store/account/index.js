import actions from './actions'
import mutations from './mutations'

const state = {
    username: localStorage.getItem('phoneNumber'),
    merchantList: localStorage.getItem('merchantList')
}

export default {
    state,
    actions,
    mutations
}
