import * as TYPES from './mutationTypes'

export default {

    [TYPES.LOAD_CHECK_SHEETS](state, payload) {
        state.checkSheet.list = payload.dataList
        state.checkSheet.pagination = R.omit(['code', 'dataList'], payload)
    },

    [TYPES.LOAD_OTHER_PAYMENT_DETAILS](state, payload) {
        state.checkSheet.otherPaymentDetails = payload
    },

    [TYPES.REAL_TIME_TRADE_LIST](state, payload) {
        state.realTimeOrders.list = payload.dataList
        state.realTimeOrders.pagination = R.omit(['code', 'dataList'], payload)
    },

    // 订单总金额汇总
    [TYPES.LOAD_CHECK_SHEETS_ORDER_SUM](state, payload) {
        state.checkSheet.sum = payload
    },

    // 订单总金额汇总
    [TYPES.LOAD_INVOICE_QUERY_LIST](state, payload) {
        state.invoiceQuery.list = payload.dataList
        state.invoiceQuery.pagination = R.omit(['code', 'dataList'], payload)
    },

    [TYPES.LOAD_CHECK_ACCOUNT_LIST](state, payload) {
        state.checkAccount.list = payload.dataList
    },
    [TYPES.LOAD_ABNORMAL_PAT_RECORD_LIST](state, payload) {
        state.abnormalPayRecord.list = payload.dataList
    },
    [TYPES.LOAD_RECOMMENDED_ABNORMAL_PAT_RECORD_LIST](state, payload) {
        state.recommendedAbnormalPayRecord.list = payload.dataList
    },
    [TYPES.LOAD_CHECK_ACCOUNT_SETTING_LIST](state, payload) {
        state.checkAccountSetting.list = payload.dataList
    },
    [TYPES.LOAD_STORE_CHECKED_STATEMENT_LIST](state, payload) {
        state.checkAccount.storeStatements = payload.dataList
    },
    [TYPES.LOAD_STORE_CHECKED_STATEMENT_DETAILS](state, payload) {
        state.checkAccount.storeStatementDetails = payload.dataList
        state.checkAccount.originalStoreStatementDetails = R.clone(payload.dataList)

        const map = payload?.dataList.reduce((map, item) => {
            if (item.orderCheckPayRecordDTOList.length) {
                item.orderCheckPayRecordDTOList.forEach(checkedItem => {
                    if (checkedItem.name && checkedItem.code) {
                        map[checkedItem.name] = checkedItem.code
                    }
                })
            }
            return map
        }, {})

        state.checkAccount.settlements = Object.keys(map).map(k => ({ label: k, value: map[k] }))
    },

    [TYPES.SYNC_UPDATE_ORDER](state, payload) {
        const oldList = state.checkAccount?.storeStatementDetails
        const oldOriginalList = state.checkAccount?.originalStoreStatementDetails
        const rebuild = list => {
            return list.map(item => {
                if (item.billNumber === payload.billNumber) {
                    return payload
                }
                return item
            })
        }
        state.checkAccount.originalStoreStatementDetails = rebuild(oldOriginalList)
        state.checkAccount.storeStatementDetails = rebuild(oldList)
    },

    [TYPES.SYNC_UPDATE_STORE_CHECKED_STATEMENT_DETAILS](state, payload) {
        state.checkAccount.storeStatementDetails = payload
    },

    [TYPES.SYNC_UPDATE_EXPAND_ITEMS](state, payload) {
        const expandSet = new Set(state.checkAccount.expands)
        if (expandSet.has(payload)) {
            expandSet.delete(payload)
        } else {
            expandSet.add(payload)
        }
        state.checkAccount.expands = Array.from(expandSet)
    },

    [TYPES.SYNC_REMOVE_EXPAND_ITEMS](state, payload) {
        const expandSet = new Set(state.checkAccount.expands)
        if (expandSet.has(payload)) {
            expandSet.delete(payload)
        }
        state.checkAccount.expands = Array.from(expandSet)
    },

    [TYPES.SYNC_CLEAR_EXPAND_ITEMS](state) {
        state.checkAccount.expands = []
    }
}
