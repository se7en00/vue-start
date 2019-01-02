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

export default helps
