// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import store from './store'// 状态管理
import '@babel/polyfill'
import App from './containers/App'
import menus from './menu/menus'

import '@/scss/global.scss'
// 核心插件

import core from '@/plugins/core'

Vue.use(core)

/* eslint-disable no-new */
new Vue({
    el: '#root',
    router,
    store,
    components: { App },
    template: '<App/>',
    render: function(createElement) {
        if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
            window.addEventListener('hashchange', () => {
                var currentPath = window.location.hash.slice(1)
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath)
                }
            }, false)
        }
        return createElement(App)
    },
    watch: {
        // 监听路由 控制侧边栏显示
        '$route.matched'(val) {
            const _side = menus.filter(menu => menu.path === val[0].path)
            this.$store.commit('SYNC_SET_ASIDE_MENU', _side.length > 0 ? _side[0].children : [])
        }
    }
})
