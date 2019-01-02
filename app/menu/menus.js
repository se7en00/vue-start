// 菜单 侧边栏
const menus = [
    // { path: '/index', title: '首页', icon: 'fas fa-home' },
    // {
    //     title: '支付设置',
    //     icon: 'fab fa-cc-amazon-pay',
    //     children: (pre => [
    //         { path: `${pre}/setting`, title: '支付配置' }
    //     ])('/payment/merchant')
    // },
    {
        title: '基础设置',
        // icon: 'fas fa-cog',
        path: '/baseSetting',
        children: (pre => [
            { path: `${pre}/area`, title: '区域管理', icon: 'fas fa-map-marker-alt' }
        ])('/baseSetting')
    }
]

const headerMenu = menus.map(menu => R.omit(['children'], menu))

export default menus
export {
    headerMenu
}
