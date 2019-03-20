const helps = {}
/**
 * 魔法值，神仙数字 映射成 人类能识别的字符串：）
 * @param {String}  key 需要映射的魔法值
 * @param {Object} source 枚举对象
 * @param {String} mappingProp 关联魔法值，神仙数字的识别码
 */
helps.mappingValue = (key) => (source, mappingProp = 'label') => {
    const map = source.reduce((map, sourceTarget) => R.assoc(sourceTarget.value, sourceTarget[mappingProp], map), {})
    return map[key]
}

/**
 * 清除对象中为空值的属性
 * @param {Object} source 处理对象
 */
helps.clearEmptyAttr = (source) => (R.compose(
    R.fromPairs,
    R.reject(
        R.compose(
            R.isEmpty,
            R.last
        )
    ),
    R.toPairs
)(source))

/**
 * 金额千分位的展示
 * @param {String} money 金额
 * @param {String} symbol 金额符号
 */
helps.formatMoney = (money, symbol = '¥') => {
    if (R.isEmpty(money)) return
    const re = /(?=(?!(\b))(\d{3})+(\.\d{2})?$)/g
    const formatMoney = money?.toString()?.replace(re, ',')
    return symbol ? money == 0 ? money : `${symbol}${formatMoney}` : formatMoney //eslint-disable-line
}

export default helps
