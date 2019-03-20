<template>
    <el-breadcrumb>
        <transition-group name="slide">
            <el-breadcrumb-item
                v-for="(item, index) in levelList"
                v-if="item.meta.breadCrumbs"
                :key="item.path">
                <span v-if="index === levelList.length-1">{{item.meta.breadCrumbs}}</span>
                <!--<a :href="item.path" v-else >{{ item.meta.breadCrumbs }}</a>-->
                <router-link
                    v-else
                    :to="item.path">{{ item.meta.breadCrumbs }}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import { frameInRoutes } from '@/router/routes'
export default {
    name: 'BreadCrumb',
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            const buildRoutePathWithParams = (routeParams) => (route) => {
                Object.keys(routeParams).forEach(param => {
                    route.path = route.path.replace(`:${param}`, this.$route.params[param])
                })
                return route
            }
            const allRoutes = this.$route.matched.map((routeRecord) => {
                if (!routeRecord.path || !routeRecord.path.length) return
                let route = Object.assign({}, routeRecord)
                let routes = []

                // 替换当前route的param 参数
                route = buildRoutePathWithParams(this.$route.params)(route)

                if (route.meta?.parentName) {
                    const parentName = route.meta.parentName
                    const { find, propEq, compose, prop, has, clone } = R
                    // 过滤没有children属性的routes,
                    // 注： 目前只支持在routes children 里建立父子关联， 且是一对一的
                    const routesWithChildren = R.call(compose(
                        find,
                        has('children')
                    ))

                    // 找出当前route的关联的父route
                    const findParentRoute = R.call(compose(
                        find,
                        propEq('name')
                    ), parentName)

                    const padParentPath = (preUrl) => (route) => {
                        route.path = `${preUrl}/${route.path}`
                        return route
                    }

                    const parentRoute = compose(
                        padParentPath(routeRecord.parent.path), // 转化父url成为绝对路径的url
                        buildRoutePathWithParams(this.$route.params), // 替换父route中param参数为当前值
                        clone,
                        findParentRoute,
                        prop('children'),
                        routesWithChildren
                    )(frameInRoutes)

                    routes.push(parentRoute)
                }

                routes.push(route)

                return routes
            }, this)

            this.levelList = R.flatten(allRoutes)
        }
    }
}
</script>

<style>
</style>
