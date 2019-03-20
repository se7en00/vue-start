import { SideBar, Header, Main } from '@/layout'
const meta = { requiresAuth: true }
/**
 * 在主框架内显示
 */
const frameIn = [
    {
        path: '/',
        redirect: { name: 'merchant-baseSetting' },
        components: {
            default: Main,
            header: Header,
            sideBar: SideBar
        }
    },

    {
        path: '/',
        name: 'index',
        redirect: { name: 'merchant-finance' },
        components: {
            default: Main,
            header: Header,
            sideBar: SideBar
        }
    },

    //
    {
        path: '/finance',
        name: 'merchant-finance',
        meta: { ...meta, breadCrumbs: '财务中心', role: ['finance'] },
        redirect: { name: 'merchant-finance-checkAccount' },
        components: {
            default: Main,
            header: Header,
            sideBar: SideBar
        },
        children: (pre => [
            // 对账
            {
                path: 'checkAccount',
                name: `${pre}checkAccount`,
                component: () => import('@/views/finance/checkAccount'),
                redirect: { name: 'merchant-finance-checkAccount-statements' },
                meta: { ...meta, breadCrumbs: '对账管理', title: '对账管理', role: ['reconciliation'] },
                children: [
                    {
                        path: 'statements',
                        name: `${pre}checkAccount-statements`,
                        component: () => import('@/views/finance/checkAccount/details'),
                        redirect: { name: `${pre}checkAccount-statements-details` },
                        meta: { ...meta, title: '门店统计', breadCrumbs: '门店统计' },
                        // props: { timestamp: '1548172800000' },
                        children: [
                            {
                                path: 'details',
                                name: `${pre}checkAccount-statements-details`,
                                component: () => import('@/views/finance/checkAccount/details/Statements'),
                                meta: { ...meta, title: '门店统计' },
                                props: true
                            },
                            {
                                path: 'store/:storeCode/details',
                                name: `${pre}checkAccount-statements-storeDetail`,
                                component: () => import('@/views/finance/checkAccount/storeDetails'),
                                meta: { ...meta, title: '门店明细', breadCrumbs: '门店明细' },
                                props: true
                            }
                        ]
                    }
                ]
            }
        ])('merchant-finance-')
    },
    // 基础设置
    {
        path: '/baseSetting',
        name: 'merchant-baseSetting',
        meta: { ...meta, breadCrumbs: '基础设置', role: ['basic_setting'] },
        redirect: { name: 'merchant-baseSetting-area' },
        components: {
            default: Main,
            header: Header,
            sideBar: SideBar
        },
        children: (pre => [
            // 区域管理
            {
                path: 'area',
                name: `${pre}area`,
                component: () => import('@/views/basicSetting'),
                redirect: { name: 'merchant-baseSetting-area-list' },
                meta: { ...meta, breadCrumbs: '区域管理', title: '区域管理', role: ['area'] },
                children: [
                    {
                        path: 'index',
                        name: `${pre}area-list`,
                        component: () => import('@/views/basicSetting/area/index'),
                        meta: { ...meta, title: '区域管理' }
                    },
                    {
                        path: 'newArea',
                        name: `${pre}area-new`,
                        component: () => import('@/views/basicSetting/area/details'),
                        meta: { ...meta, breadCrumbs: '新建区域', title: '新建区域' }
                    },
                    {
                        path: ':areaId/details',
                        name: `${pre}area-details`,
                        props: true,
                        component: () => import('@/views/basicSetting/area/details'),
                        meta: { ...meta, breadCrumbs: '编辑区域', title: '编辑区域' }
                    }
                ]
            }
        ])('merchant-baseSetting-')
    }
]

/**
 * 在主框架之外显示
 */
export const frameOut = [
    // 页面重定向使用
    {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    }
]

/**
 * 错误页面
 */
export const errorPage = [
    // 401
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401')
    },
    // 404
    {
        path: '*',
        name: '404',
        component: () => import('@/views/error/404')
    }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
]
