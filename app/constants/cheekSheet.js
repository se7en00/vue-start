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
        value: 0
    },
    {
        label: '退款',
        value: 1
    }
]

/**
 * 对账状态
 */
export const STATEMENT_STATUS = [
    {
        label: '金额不一致',
        colorType: 'danger',
        value: 0
    },
    {
        label: '短款',
        colorType: 'cashShort',
        value: 1
    },
    {
        label: '长款',
        colorType: 'cashOver',
        value: 2
    },
    {
        label: '对账成功',
        colorType: 'success',
        value: 3
    },
    {
        label: '对账成功(平)',
        colorType: 'success2',
        value: -1
    }
]

export const STATEMENT_STATUS_MAPPING = STATEMENT_STATUS.reduce((map, item) => R.assoc(item.colorType, item.value, map), {})
/**
 * 对账状态 对应标签的颜色
 */
export const STATEMENT_STATUS_COLORFUL = STATEMENT_STATUS.reduce((map, item) => R.assoc(item.value, item.colorType, map), {})

/**
 * 对账结果
 */
export const STATEMENT_RESULT = [
    {
        label: '金额不一致',
        value: '0'
    },
    {
        label: '对账成功',
        value: '1'
    }
]

/**
 * 支付状态
 */
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

/**
 *  结算方式
 */
export const PAYMENT_CATEGORY = {
    card: '银行卡支付',
    valuecard: '储值卡支付',
    cash: '现金'
}
/**
 *  支付方式
 */
export const PAY_TYPE = [
    {
        label: '支付宝',
        value: 'alipay'
    },
    {
        label: '微信',
        value: 'wxpay'
    },
    {
        label: '银联二维码',
        value: 'unionpay'
    }
]
/**
 *  收单通道
 */
export const PAY_CHANNEL = [
    {
        label: '快钱',
        value: 'bill99'
    },
    {
        label: '支付宝',
        value: 'alipay'
    },
    {
        label: '微信',
        value: 'wxpay'
    },
    {
        label: '银联二维码',
        value: 'unionpay'
    },
    {
        label: '富友',
        value: 'fuiou'
    },
    {
        label: '银联商务 ',
        value: 'chinaums'
    }
]

/**
 * 支付状态
 */
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
