import * as TYPES from './mutationTypes'

export default {
    [TYPES.SYNC_TOGGLE_SIDE_BAR](state) {
        state.asideCollapse = !state.asideCollapse
    },

    [TYPES.SYNC_SET_ASIDE_MENU](state, payload) {
        state.asideMenu = payload
    }
}
