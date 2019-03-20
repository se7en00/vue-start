import Axios from '@/plugins/axios/http'
import * as TYPES from './mutationTypes'
export default {
    /**
     *  异常支付记录列表
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async getRecommendedAbnormalPayRecordList({ commit }, params) {
        const list = await Axios.get('/api/checkAccount/abnormalList', { params })
            .catch(error => Promise.reject(error))
        commit(TYPES.LOAD_RECOMMENDED_ABNORMAL_PAT_RECORD_LIST, list)
    },

    /**
     * 商户门店对账列表
     */
    async getStoreCheckedStatements({ commit }, params) {
        const list = await Axios.get('/api/checkAccount/statements', { params })
            .catch(error => Promise.reject(error))
        commit(TYPES.LOAD_STORE_CHECKED_STATEMENT_LIST, list)
    },

    async getStoreStatementDetails({ commit }, params) {
        const list = await Axios.get('/api/checkAccount/storeDetails', { params })
            .catch(error => Promise.reject(error))
        commit(TYPES.LOAD_STORE_CHECKED_STATEMENT_DETAILS, list)
    },

    async updateCheckedStatement({ commit }, params) {
        const order = await Axios.put('/orderCheck/v1/payRecord', params)
            .catch(error => Promise.reject(error))
        commit(TYPES.SYNC_UPDATE_ORDER, order.data)
    },

    async syncCheckedStatement({ dispatch }, params) {
        await Axios.put('/orderCheck/v1/update', {}, { params })
            .catch(error => Promise.reject(error))
        const { merchantId, storeCode, year, month, date } = params
        const listParams = {
            merchantId,
            storeCode,
            year,
            month,
            date
        }

        dispatch('getStoreStatementDetails', listParams)
    },

    async match({ commit }, params) {
        const order = await Axios.put('/orderCheck/v1/match', { ...params })
            .catch(error => Promise.reject(error))
        commit(TYPES.SYNC_UPDATE_ORDER, order.data)
    },

    updateOrder({ commit }, order) {
        commit(TYPES.SYNC_UPDATE_ORDER, order)
    },

    syncUpdateExpands({ commit }, billNumber) {
        commit(TYPES.SYNC_UPDATE_EXPAND_ITEMS, billNumber)
    },

    syncClearExpands({ commit }) {
        commit(TYPES.SYNC_CLEAR_EXPAND_ITEMS)
    },

    syncUpdateCheckedStatementDetails({ commit }, list) {
        commit(TYPES.SYNC_UPDATE_STORE_CHECKED_STATEMENT_DETAILS, list)
    },

    /**
     *  同步订单系统
     * @param dispatch
     * @param params 同步订单参数
     * @param delay 轮询时间
     * @param vm vue实例
     * @returns {Promise<void>}
     */
    async syncOrder({ dispatch }, { params, delay, vm }) {
        let result
        let timer
        // 查询订单同步情况
        const getSyncOrderInfo = order => Axios.post('/orderCheck/v1/getSyncBillInfo', {}, { params: { syncId: order.id } })
            .then(({ data: orderSyncInfo }) => {
                switch (orderSyncInfo.status) {
                case 0 :
                    return syncOrderInfo(order, delay)
                case 1 :
                    const listParams = {
                        merchantId: params.merchantId,
                        year: params.year,
                        month: params.month,
                        date: params.date
                    }
                    dispatch('getStoreCheckedStatements', listParams)
                    return orderSyncInfo
                default: // 同步失敗
                    clearTimeout(timer)
                    return Promise.reject(orderSyncInfo)
                }
            })
            .catch(error => Promise.reject(error))

        const syncOrderInfo = (syncOrder, delay) => {
            return new Promise(resolve => {
                timer = setTimeout(() => resolve(getSyncOrderInfo(syncOrder)), delay)
                vm.$emit('update:timer', timer)
            })
        }

        const orderParams = {
            storeCode: params.storeCode,
            reconciliationDate: params.reconciliationDate
        }
        const order = await Axios.post('/orderCheck/v1/syncBillData', {}, { params: orderParams })
            .then(res => res.status === 2 ? Promise.reject(res) : res.data)
            .catch(error => Promise.reject(error))

        // 同步中
        if (!order.status) {
            result = await syncOrderInfo(order, delay)
        } else {
            result = order
        }

        return result
    }
}
