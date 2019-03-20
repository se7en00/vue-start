import actions from './actions'
import mutations from './mutations'

const state = {
    checkSheet: {
        otherPaymentDetails: [],
        list: [],
        pagination: {},
        sum: {}
    },

    realTimeOrders: {
        list: [],
        pagination: {}
    },
    invoiceQuery: {
        list: [],
        pagination: {}
    },
    checkAccount: {
        list: [],
        storeStatements: [],
        storeStatementDetails: [],
        originalStoreStatementDetails: [],
        settlements: [],
        matched: {},
        expands: []
    },
    abnormalPayRecord: {
        list: []
    },
    recommendedAbnormalPayRecord: {
        list: []
    },
    checkAccountSetting: {
        list: []
    }
}

export default {
    state,
    actions,
    mutations
}
