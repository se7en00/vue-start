import log from './util.log'
import cookies from './util.cookies'
import helps from './util.helps'

const util = {
    cookies,
    log,
    helps
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'ys-menu-link')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('ys-menu-link'))
}

export default util
