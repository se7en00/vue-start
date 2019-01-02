const account = {
    'GET /api/user': {
        id: 1,
        username: 'test',
        password: 'test'
    },

    'GET /api/users': [
        {
            id: 1,
            username: 'kenny',
            accountName: '大龙'
        }, {
            id: 2,
            username: 'test',
            accountName: '中龙'
        }, {
            id: 3,
            username: 'seven',
            accountName: '小龙'
        }
    ],

    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body
        if (password === '123' && username === 'admin') {
            return res.json({
                status: 'ok',
                code: 0,
                data: {
                    user: {
                        id: 1,
                        username: 'admin',
                        sex: 6
                    },
                    token: 'sdfsdfsdfdsf'
                }
            })
        } else {
            return res.status(403).json({
                status: 'error',
                code: 403
            })
        }
    }
}

module.exports = account
