import actions from './actions'
import mutations from './mutations'

const state = {
    roles: [],
    headerMenus: [],
    asideMenus: [],
    menus: [],
    routes: [],
    asideCollapse: false // 侧边栏默认折叠状态
}

export default {
    state,
    actions,
    mutations
}
