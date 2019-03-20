import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import { default as routes, frameOut } from './routes'//eslint-disable-line

Vue.use(VueRouter)

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 导出路由 在 main.js 里使用
const createRouter = () => new VueRouter({ routes })
const router = createRouter()

const whiteList = frameOut.map(item => item.path)
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    const redirectToLogin = (path) => {
        if (~whiteList.indexOf(path)) {
            next()
        } else {
            next('/login')// 不然就跳转到登录；
        }
    }

    // 进度条
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    // localStorage是否存有token作为验证是否登录的条件
    const token = localStorage.getItem('token')

    if (token && token !== 'undefined') {
        if (store.getters.roles.length === 0 && store.getters.routes.length === 0) {
            store.dispatch('getRoles')
                .then(() => {
                    // https://github.com/vuejs/vue-router/issues/1234 重置router 信息
                    router.matcher = createRouter().matcher
                    router.addRoutes(store.getters.routes)
                    if (from.name === 'login') {
                        next({ path: '/', replace: true })
                    } else {
                        next({ ...to, replace: true })
                    }
                })
                .catch(() => {
                    redirectToLogin(to.path)
                })
        } else {
            next()
        }
    } else {
        NProgress.done() // 登出后，在强制进入其他页面时， 跳转到login页面，ngProgress 进度条会一直处于加载中，所以这里先临时解决一下
        redirectToLogin(to.path)
    }
})

router.afterEach(() => {
    // 进度条
    NProgress.done()
})

export default router
