import { STATEMENT_STATUS_MAPPING } from '@/constants'
export default class StatementSearch {
    constructor(param) {
        this._orderNum = param.billNumber
        this._orderType = param.orderType
        this._settlementCode = param.settlementCode
        this._checkResult = param.checkResult
        this._payChannel = param.payChannel
    }

    pipe = fns => data => fns.reduce((value, fn) => fn(value), data)

    /**
     *  查询订单号
     * @param list 对账信息
     * @returns Array
     */
    searchOrderNum = (list) => {
        if (this._orderNum === undefined || this._orderNum === '' || !list.length) return list
        return list.filter(item => item.billNumber === this._orderNum)
    }

    /**
     *  查询订类型
     * @param list 对账信息
     * @returns Array
     */
    searchOrderType = (list) => {
        if (this._orderType === undefined || this._orderType === '' || !list.length) return list
        return list.filter(item => item.orderType === this._orderType)
    }

    /**
     *  查询对账结果
     * @param list 对账信息
     * @returns Array
     */
    searchCheckStatementResult = (list) => {
        if (this._checkResult === undefined || this._checkResult === '' || !list.length) return list
        if (this._checkResult === -1) {
            return list.filter(item => item.orderCheckPayRecordDTOList?.some(checkedItem => checkedItem.checkResult === STATEMENT_STATUS_MAPPING.success && checkedItem.isManualCheck))
        } else {
            return list.filter(item => item.checkResult === this._checkResult && !item.isManualCheck)
        }
    }

    /**
     *  查询收单通道
     * @param list 对账信息
     * @returns Array
     */
    searchPaymentStatus = (list) => {
        if (this._payChannel === undefined || this._payChannel === '' || !list.length) return list
        return list.filter(item => item.orderCheckPayRecordDTOList?.some(checkedItem => checkedItem.payChannel === this._payChannel))
    }

    /**
     *  查询结算方式
     * @param list 对账信息
     * @returns Array
     */
    searchSettlement = (list) => {
        if (this._settlementCode === undefined || this._settlementCode === '' || !list.length) return list
        return list.filter(item => item.orderCheckPayRecordDTOList?.some(checkedItem => checkedItem.code === this._settlementCode))
    }

    search = (statements) => {
        return this.pipe([
            this.searchOrderType,
            this.searchOrderNum,
            this.searchSettlement,
            this.searchCheckStatementResult,
            this.searchPaymentStatus
        ])(statements)
    }
}
