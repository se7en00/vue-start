// 菜单 侧边栏
const menus = [
    {
        title: '账务中心',
        path: '/finance',
        role: ['finance'],
        sort: '0',
        // icon: 'fas fa-money-check-alt',
        children: (pre => [
            { path: `${pre}/checkAccount`, title: '对账管理', icon: 'fas fa-clipboard-check', role: ['reconciliation'], sort: '0-1' }
        ])('/finance')
    }, {
        title: '基础设置',
        role: ['basic_setting'],
        path: '/baseSetting',
        sort: '1',
        children: (pre => [
            { path: `${pre}/area`, title: '区域管理', icon: 'fas fa-map-marker-alt', role: ['area'], sort: '1-1' }
        ])('/baseSetting')
    }
]

const headerMenu = menus.map(menu => R.omit(['children'], menu))

export default menus
export {
    headerMenu
}
