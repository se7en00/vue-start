import * as TYPES from './mutationTypes'
import Axios from '@/plugins/axios/http'
import { API } from '@/constants'

export default {
    asideCollapseToggle: ({ commit }) => {
        commit(TYPES.SYNC_TOGGLE_SIDE_BAR)
    },

    /**
     * @description 加载当前用户权限列表
     * @param {Object} param context
     */
    async getRoles({ commit }) {
        const permissions = await Axios.get(API.PERMISSIONS.URL)
            .then(res => res.data)
            .catch(error => Promise.reject(error))
        commit(TYPES.GET_ROLES, permissions)
    },

    getWhiteListRoles({ commit }) {
        commit(TYPES.SYNC_GET_WHITE_LIST_ROLES)
    },

    clearRoles({ commit }) {
        commit(TYPES.SYNC_CLEAR_ROLES)
    },

    generateRouters({ commit }, roles) {
        commit(TYPES.SYNC_GENERATE_ROUTERS, roles)
    }

    // /**
    //  *  设置左菜单栏
    //  * @param commit
    //  * @param asideMenu
    //  */
    // asideSet: ({ commit }, asideMenu) => {
    //     commit(TYPES.SYNC_SET_ASIDE_MENU, asideMenu)
    // }
}
