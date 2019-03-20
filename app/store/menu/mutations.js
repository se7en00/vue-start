import * as TYPES from './mutationTypes'
import { default as menus, headerMenu } from '@/menu/menus' //eslint-disable-line
import { frameInRoutes } from '@/router/routes'

export default {
    [TYPES.SYNC_TOGGLE_SIDE_BAR](state) {
        state.asideCollapse = !state.asideCollapse
    },

    [TYPES.SYNC_SET_ASIDE_MENU](state, payload) {
        state.asideMenus = payload
    },

    [TYPES.SYNC_GET_WHITE_LIST_ROLES](state) {
        state.routes = frameInRoutes
        state.headerMenus = headerMenu
        state.menus = menus
    },

    [TYPES.GET_ROLES](state, payload) {
        // 去除无权限的菜单
        const filterNoPermissionsMenu = (permission, allPermissions) => {
            return permission ? R.intersection(permission, allPermissions).length : true
        }

        const filterChildren = (menus, roles, isRoutes) => {
            return menus.filter(menu => {
                if (menu.children && !isRoutes) {
                    menu.children = filterChildren(menu.children, roles)
                    return menu.children.length
                }
                const role = isRoutes ? menu.meta.role : menu.role
                return filterNoPermissionsMenu(role, roles)
            })
        }

        const resetRedirectPath = (route, comparePath, target) => {
            const filterChildren = route.children.filter(childRoute => childRoute.path === comparePath)
            if (filterChildren && filterChildren.length) {
                target.redirect.name = filterChildren[0].name
            }
        }
        if (!R.isEmpty(payload)) {
            const headerRoles = Object.keys(payload)
            // 根据权限过滤头部菜单
            const restHeader = headerMenu.filter(menu => filterNoPermissionsMenu(menu.role, headerRoles))
            // 根据权限过滤左菜单栏
            const restMenus = menus
                .filter(menu => filterNoPermissionsMenu(menu.role, headerRoles))
                .map(menu => {
                    if (!menu.role) return menu
                    const roles = menu.role.reduce((array, role) => array.concat(payload[role]), []) // 当前全部权限
                    const cloneMenu = R.clone(menu)
                    cloneMenu.children = filterChildren(cloneMenu.children, roles)
                    return cloneMenu
                })

            // 计算头部菜单下的默认页面
            const sortRestMenusToMap = restMenus.reduce((map, pre) => {
                map[pre.path] = pre.children.reduce((pre, next) => {
                    if (pre.children && pre.children.length) {
                        return pre.children.reduce((childrenPre, childrenNext) => childrenPre.sort < childrenNext.sort ? childrenPre : childrenNext)
                    } else {
                        return pre.sort < next.sort ? pre : next
                    }
                })
                return map
            }, {})

            const indexDefaultRoute = restMenus.reduce((pre, next) => pre.sort < next.sort ? pre : next)
            const dynamicRoutes = frameInRoutes.map((route, index, array) => {
                if (route.path === '*') return route
                const isIncluded = Object.keys(sortRestMenusToMap).some(key => key.includes(route.path))
                if (isIncluded) {
                    if (route.path === indexDefaultRoute.path) {
                        let newIndexPath = sortRestMenusToMap[indexDefaultRoute.path]?.path?.split('/')[2]
                        if (!newIndexPath) {
                            newIndexPath = sortRestMenusToMap[indexDefaultRoute.path]?.children[0]?.path?.split('/')[2]
                        }
                        resetRedirectPath(route, newIndexPath, array[0])
                    }
                    if (route.children && route.children.length && route.meta?.role) {
                        const cloneRoute = R.clone(route)
                        const roles = route.meta.role.reduce((array, role) => array.concat(payload[role]), [])
                        cloneRoute.children = filterChildren(cloneRoute.children, roles, true)
                        const newRoutePath = sortRestMenusToMap[route.path]?.path?.split('/')[2]
                        resetRedirectPath(cloneRoute, newRoutePath, cloneRoute)
                        return cloneRoute
                    }
                    return route
                }
            }).filter(Boolean)

            state.roles = payload
            state.headerMenus = restHeader
            state.menus = restMenus
            state.routes = dynamicRoutes
        } else {
            // 无权限
            state.routes = frameInRoutes.map(route => {
                if (route.path === '/') {
                    route.redirect.name = '401'
                    return route
                }
                if (route.path === '*') {
                    return route
                }
            }).filter(Boolean)
        }
    },

    [TYPES.SYNC_CLEAR_ROLES](state, payload) {
        state.roles = []
        state.headerMenus = []
        state.menus = []
        state.routes = []
    }
}
