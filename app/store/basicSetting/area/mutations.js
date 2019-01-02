import * as TYPES from '../mutationTypes'

export default {
    [TYPES.LOAD_AREA_LIST](state, payload) {
        state.area.list = payload.dataList
        state.area.pagination = R.omit(['code', 'dataList'], payload)
    },

    [TYPES.LOAD_PROVINCE](state, payload) {
        state.area.province = payload.dataList
    }
}
