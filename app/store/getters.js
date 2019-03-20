const getters = {
    merchantList: state => {
        if (!state.account.merchantList) return null
        return JSON.parse(state.account.merchantList)
    },
    merchantName: state => {
        if (!state.account.merchantList) return null
        const merchantList = JSON.parse(state.account.merchantList)
        return merchantList[0].name
    },
    currentMerchantId: state => {
        if (!state.account.merchantList) return null
        return JSON.parse(state.account.merchantList)[0].id
    },
    roles: state => state.menu.roles,
    routes: state => state.menu.routes,
    menus: state => state.menu.menus,
    headerMenus: state => state.menu.headerMenus,
    username: state => state.account.username,
    fullName: state => state.account.fullName
}

export default getters
