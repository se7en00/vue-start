import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/utils'
import router from '@/router'
import { API } from '@/constants'

// 创建一个错误
function errorCreate(response, errorMsg) {
    const { url, baseURL } = response.config
    const originAPI = url.replace(new RegExp(baseURL), '').trim()
    // 过滤不需要全局错误提示
    const isOmitted = Object.keys(API).some(k => API[k].omitAlertMsg && API[k].URL === originAPI)
    errorLog({
        isOmitted,
        status: response.status,
        api: originAPI,
        msg: errorMsg
    })
    throw new Error(errorMsg)
}

// 记录和显示错误
function errorLog(err) {
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        /* eslint-disable */
        console.group()
        console.error(`[status code]: ${err.status}`)
        console.error(`[api]: ${err.api}`)
        console.error(`[error message]: ${err.msg}`)
        console.groupEnd()
        /* eslint-enable */
    }
    if (!err.isOmitted) {
        // 显示提示
        Message({
            message: err.msg,
            type: 'error',
            duration: 3 * 1000
        })
    }
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API || process.env.VUE_LOCAL_APP_API,
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = localStorage.getItem('token')
        const phoneNumber = localStorage.getItem('phoneNumber')
        if (token && phoneNumber && token !== 'undefined' && phoneNumber !== 'undefined') {
            config.headers['X-AUTH-TOKEN'] = token
            config.headers['X-AUTH-KEY'] = phoneNumber
        }

        return config
    },
    error => {
        // 发送失败
        console.log(error)//eslint-disable-line
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const { code } = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (+code) {
            case 0:
                // [ 示例 ] code === 0 代表没有错误
                return dataAxios
            case -1:
                errorCreate(response, dataAxios.message)
                break
            // token 过期
            case 50000:
                router.push({ name: 'login' })
                break
            default:
                // 不是正确的 code
                errorCreate(response, dataAxios.message)
                break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
            case 400: error.message = '请求错误'; break
            case 401: error.message = '未授权，请登录'; break
            case 403: error.message = '拒绝访问'; break
            case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
            case 408: error.message = '请求超时'; break
            case 500: error.message = '服务器内部错误'; break
            case 501: error.message = '服务未实现'; break
            case 502: error.message = '网关错误'; break
            case 503: error.message = '服务不可用'; break
            case 504: error.message = '网关超时'; break
            case 505: error.message = 'HTTP版本不受支持'; break
            default: break
            }
        }
        errorCreate(error, error.message)
        return Promise.reject(error)
    }
)

export default service
