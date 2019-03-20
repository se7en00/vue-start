import Axios from '@/plugins/axios/http'
import util from '@/utils'
import { API } from '@/constants'
import * as TYPES from './mutationTypes'

export default {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param isSavePW {String} 是保存用户账号密码到cookies
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     * @returns {Promise<void>}
     */
    login({ dispatch }, { vm, username, password, isSavePW, route = { name: 'index' } }) {
        // 开始请求登录接口
        return Axios.post(API.LOGIN.URL, { username, password }).then(res => {
            const { token, phoneNumber, merchantList } = res.data
            if (!merchantList || !merchantList.length) {
                throw new Error('无效的商户!')
            }
            localStorage.setItem('token', token)
            localStorage.setItem('phoneNumber', phoneNumber)
            localStorage.setItem('merchantList', JSON.stringify(merchantList))

            dispatch('setLoginUser', phoneNumber)
            dispatch('setCurrentMerchant', JSON.stringify(merchantList))
            // 把登入信息持久到cookie中，过期7天
            if (isSavePW) {
                util.cookies.set('username', username, { expires: 7 })
                util.cookies.set('pwd', password, { expires: 7 })
                util.cookies.set('isSavePW', isSavePW, { expires: 7 })
            } else {
                util.cookies.remove('username')
                util.cookies.remove('pwd')
                util.cookies.remove('isSavePW')
            }

            vm.$router.push(route)
        }).catch(err => Promise.reject(err))
    },

    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     */
    logout({ dispatch, commit }, { vm }) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        commit(TYPES.LOGOUT)
        dispatch('clearRoles')
        vm.$router.push({ name: 'login' })
    },

    /**
     * @description 设置 vuex 用户信息
     * @param {Object} param context
     * @param {Object} username confirm {Object} 登陆用户
     */
    setLoginUser({ commit }, username) {
        commit(TYPES.SET_LOGIN_USER, username)
    },

    /**
     * @description 设置当前商户
     * @param {Object} param context
     *   * @param {Object} param vm {Object} vue 实例
     * @param {Object} merchantList confirm {Object} 当前商户集
     */
    setCurrentMerchant({ commit }, merchantList) {
        commit(TYPES.SET_CURRENT_MERCHANT_LIST, merchantList)
    }
}
