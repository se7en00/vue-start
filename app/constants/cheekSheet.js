/**
 * 订单状态
 */
export const ORDER_STATUS = [
    {
        label: '成功',
        value: '1'
    },
    {
        label: '失败',
        value: '0'
    }
]

/**
 * 订单类型
 */
export const ORDER_CATEGORY = [
    {
        label: '消费',
        value: '0'
    },
    {
        label: '退款',
        value: '1'
    }
]

/**
 * 对账状态
 */
export const STATEMENT_STATUS = [
    {
        label: '未对账',
        value: '0'
    },
    {
        label: '已对账',
        value: '1'
    }
]

/**
 * 对账结果
 */
export const STATEMENT_RESULT = [
    {
        label: '不一致',
        value: '0'
    },
    {
        label: '一致',
        value: '1'
    }
]

export const PAYMENT_STATUS = [
    {
        label: '未完成',
        value: '0'
    },
    {
        label: '完成',
        value: '1'
    }
]

export const PAYMENT_CATEGORY = {
    card: '银行卡支付',
    valuecard: '储值卡支付',
    cash: '现金'
}

export const PAY_CHANNEL = [
    {
        label: '快钱',
        value: 'BILL99'
    },
    {
        label: '支付宝直连',
        value: 'ALIPAY'
    },
    {
        label: '微信直连',
        value: 'WXPAY'
    },
    {
        label: '银联二维码',
        value: 'UNIONPAY'
    },
    {
        label: '富友',
        value: 'FUIOU'
    },
    {
        label: '银联商务 ',
        value: 'CHINAUMS'
    }
]

export const PAY_STATUS = [
    {
        label: '处理中',
        value: '0'
    },
    {
        label: '成功',
        value: '20'
    },
    {
        label: '成功',
        value: '30'
    },
    {
        label: '失败',
        value: '90'
    },
    {
        label: '取消',
        value: '91'
    }
]
