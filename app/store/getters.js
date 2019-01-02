const getters = {
    merchantList: state => {
        if (!state.account.merchantList) return null
        return JSON.parse(state.account.merchantList)
    },
    currentMerchantId: state => {
        if (!state.account.merchantList) return null
        return JSON.parse(state.account.merchantList)[0].id
    },
    username: state => state.account.username
}

export default getters
