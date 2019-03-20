const account = require('./account')
const permissions = require('./permissions')
const area = require('./area')
const checkAccount = require('./checkAccount')

const proxy = Object.assign({},
    account,
    permissions,
    area,
    checkAccount
)

module.exports = proxy
