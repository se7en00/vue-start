import * as TYPES from './mutationTypes'

export default {
    asideCollapseToggle: ({ commit }) => {
        commit(TYPES.SYNC_TOGGLE_SIDE_BAR)
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
