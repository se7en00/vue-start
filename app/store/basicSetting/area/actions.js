import Axios from '@/plugins/axios/http'
import * as TYPES from '../mutationTypes'

export default {
    async loadAreaList({ commit }, params) {
        const list = await Axios.get('/area/v1/list', { params })
            .catch(error => Promise.reject(error))
        commit(TYPES.LOAD_AREA_LIST, list)
    },

    async deleteArea({ dispatch }, params) {
        await Axios.post('/area/v1/delete', params)
        dispatch('loadAreaList', { merchantId: params.merchantId })
    },

    // 获取省份
    async getProvince({ commit }, params) {
        const province = await Axios.get('/region/v1/province/list', { params })
            .catch(error => Promise.reject(error))
        commit(TYPES.LOAD_PROVINCE, province)
    },
    async getAreaDetails({ commit }, params) {
        const areaDetails = await Axios.get('/area/v1/detail', { params: params })
            .catch(error => Promise.reject(error))
        // commit(TYPES.LOAD_REGIONS, storeDetails)
        return areaDetails.data
    },
    // 新增、编辑
    async saveOrUpdateArea({ commit }, { vm, isCreate, params }) {
        try {
            if (isCreate) {
                await Axios.post('/area/v1/add', { ...params })
                vm.$router.push({ name: 'merchant-baseSetting-area-list' })
            } else {
                await Axios.post('/area/v1/edit', { ...params })
                vm.$router.push({ name: 'merchant-baseSetting-area-list' })
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
