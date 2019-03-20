const account = {
    'GET /api/user': {
        id: 1,
        username: 'admin',
        password: 'admin'
    },

    'POST /api/login': (req, res) => {
        const { password, username } = req.body
        if (password === 'admin' && username === 'admin') {
            return res.json({
                status: 'ok',
                code: 0,
                data: {
                    phoneNumber: '11111111111111',
                    merchantList: [{
                        id: 0,
                        name: 'admin',
                        updateTime: '2019-03-19T08:16:32.000+0000'
                    }],
                    token: 'v0H9m7Xh4NvN4f17UwzGnlWhRrPO0eQS'
                }
            })
        } else {
            return res.json({
                status: 'error',
                code: -1,
                message: '用户名密码错误'
            })
        }
    }
}

module.exports = account
