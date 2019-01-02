import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'// 路由数据

Vue.use(VueRouter)

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    // 进度条
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some(r => r.meta.requiresAuth)) {
        // localStorage是否存有token作为验证是否登录的条件
        const token = localStorage.getItem('token')
        if (token && token !== 'undefined') {
            next()
        } else {
            NProgress.done() // 登出后，在强制进入其他页面时， 跳转到login页面，ngProgress 进度条会一直处于加载中，所以这里先临时解决一下
            next({
                name: 'login'
            })
        }
    } else {
        // 不需要身份校验 直接通过
        next()
    }
})

router.afterEach(() => {
    // 进度条
    NProgress.done()
})

export default router
