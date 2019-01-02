import Cookies from 'js-cookie'

const cookies = {}
const cookiesPrefix = 'sqPortal'
/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function(name = 'default', value = '', cookieSetting = {}) {
    let currentCookieSetting = {
        expires: 1
    }
    Object.assign(currentCookieSetting, cookieSetting)
    Cookies.set(`${cookiesPrefix}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function(name = 'default') {
    return Cookies.get(`${cookiesPrefix}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function() {
    return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function(name = 'default') {
    return Cookies.remove(`${cookiesPrefix}-${name}`)
}

export default cookies
