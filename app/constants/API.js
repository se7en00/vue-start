let API = {
    LOGIN: {
        URL: '/api/login',
        omitAlertMsg: true
    },
    LOGIN_OUT: {
        URL: '/user/v1/logout'
    },

    STORE_ADD: { URL: '/store/v1/add' },
    STORE_EDIT: { URL: '/store/v1/edit' },
    STORE_DETAILS: { URL: '/store/v1/detail' },

    PERMISSIONS: { URL: 'api/permissions' },
    // 对账报表下载
    DOWNLOAD_CHECK_SHEET: { URL: '/report/v1/downloadOrderReport' }
}

// if (process.env.NODE_ENV === 'development') {
//     API = Object.keys(API).reduce((map, key) => {
//         map[key] = `/dev/${API[key]}`
//         return map
//     }, {})
// }

export default API
