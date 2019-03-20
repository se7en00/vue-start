<template>
    <div class="expandedPanel__card">
        <div class="card__header">
            <span class="title">对账单</span>
        </div>
        <div class="card__body">
            <el-table
                highlight-current-row
                :data="currentTableData"
                :span-method="arraySpanMethod"
                style="width: 100%;">

                <el-table-column
                    label="外部跟踪编号"
                    prop="modifyRelatedBillNumber"
                    align="center">
                    <template slot-scope="scope">
                        <p class="emptyContainer" v-if="scope.row.checkResult === cashShortValue">
                            未找到对应对账数据, 请手动匹配
                            <el-button
                                style="margin: 10px"
                                type="primary"
                                size="mini"
                                plain
                                @click="openMatchedDialog(scope.row)"
                                title="匹配">
                                匹配
                            </el-button>
                        </p>
                        <p v-else>{{scope.row.isModify ? scope.row.modifyRelatedBillNumber : scope.row.originRelatedBillNumber}}</p>
                    </template>
                </el-table-column>\

                <el-table-column label="收单通道" prop="payChannel" align="center" :formatter="formatterPayChannel">
                </el-table-column>

                <el-table-column label="支付方式" prop="payType" align="center" :formatter="formatterPayType">
                </el-table-column>

                <el-table-column label="手续费" prop="commissionAmount" align="center">
                    <template slot-scope="scope">
                        {{$fMoney(scope.row.commissionAmount)}}
                    </template>
                </el-table-column>

                <el-table-column label="交易流水号" prop="tradeNumber" align="center">
                </el-table-column>

                <el-table-column label="支付完成时间" prop="payFinishTime" align="center">
                    <template slot-scope="scope">
                        {{scope.row.payFinishTime ? $dayjs(scope.row.payFinishTime).format('YYYY-MM-DD HH:mm:ss') : ''}}
                    </template>
                </el-table-column>

                <el-table-column
                    :formatter="formatterStatementAmount"
                    label="对账金额"
                    prop="modifyThirdPartyCheckAmount"
                    align="center">
                </el-table-column>

                <el-table-column label="操作" align="center" v-if="isShowActionColumn">
                    <template slot-scope="scope">
                        <el-button
                            v-if="isShowEditBtn(scope.row)"
                            type="text"
                            @click="openDialog(scope.row)"
                            title="修改">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <edit-dialog
            :dialogVisible.sync="dialogVisible"
            :statement="statement"
            :order="order"/>

        <payment-matched-dialog
            :dialogVisible.sync="matchVisible"
            @match="handleMatch"
            @search="handleSearch"
        />
    </div>
</template>

<script>
import { STATEMENT_STATUS, STATEMENT_STATUS_MAPPING, PAY_CHANNEL } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
import utils from '@/utils'
import formatterPayType from '../mixins/formatterPayType'
/**
     * 映射匹配字符集的数值集
     * @param conditions 匹配的条件
     * @returns {Array} 返回匹配的值集
     */
const matchedStatements = (conditions) => STATEMENT_STATUS
    .filter(statement => ~conditions.indexOf(statement.label))
    .map(filterStatement => filterStatement.value)
export default {
    name: 'PaymentList',
    inject: ['storeCode'],
    mixins: [formatterPayType],
    components: {
        'edit-dialog': () => import('./Dialog'),
        'payment-matched-dialog': () => import('./PaymentMatchedDialog')
    },
    props: {
        tableData: {
            default: () => []
        },
        order: {
            default: () => {}
        },
        loading: {
            default: false
        }
    },
    data() {
        return {
            dialogVisible: false,
            matchVisible: false,
            statementStatusOptions: STATEMENT_STATUS,
            payChannel: PAY_CHANNEL,
            cashShortValue: STATEMENT_STATUS_MAPPING.cashShort, // 短款
            currentTableData: [],
            statement: {},
            cashShortStatement: {}
        }
    },

    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
            },
            immediate: true
        }
    },

    computed: {
        ...mapGetters(['currentMerchantId']),
        isShowActionColumn() {
            const conditions = ['金额不一致']
            return !!~matchedStatements(conditions).indexOf(this.order?.checkResult)
        }
    },

    methods: {
        ...mapActions([
            'syncCheckedStatement',
            'getRecommendedAbnormalPayRecordList',
            'match',
            'updateOrder'
        ]),

        isShowEditBtn(statement) {
            const conditions = ['金额不一致']
            return !!~matchedStatements(conditions).indexOf(statement?.checkResult)
        },

        openMatchedDialog(statement) {
            const timestamp = +this.$route.params.timestamp
            const params = {
                merchantId: this.currentMerchantId,
                reconciliationDate: this.$dayjs(timestamp).format('YYYY-MM-DD'),
                checkDetailMapId: statement.id
            }
            this.getRecommendedAbnormalPayRecordList(params)
            this.matchVisible = true
            this.cashShortStatement = statement
        },

        openDialog(statement) {
            this.dialogVisible = true
            this.statement = statement
        },

        formatterStatementAmount(statement) {
            return statement?.isModify ? this.$fMoney(statement.modifyThirdPartyCheckAmount) : this.$fMoney(statement.originThirdPartyCheckAmount)
        },

        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (row.checkResult === this.cashShortValue) {
                const maxColumn = this.order.checkResult === STATEMENT_STATUS_MAPPING.danger ? 8 : 7
                if (columnIndex === 0) {
                    return [1, maxColumn]
                } else if (columnIndex >= 1 && columnIndex < maxColumn) {
                    return [0, 0]
                }
            }
        },

        handleMatch(matchedItem) {
            const params = {
                merchantId: this.currentMerchantId,
                storeCode: this.storeCode,
                mapOrderId: this.cashShortStatement.id,
                mapPayId: matchedItem.orderCheckDetailMapId
            }
            this.match(params)
                .then(() => {
                    this.$message({
                        message: '匹配成功',
                        type: 'success'
                    })
                    this.matchVisible = false
                })
        },

        handleSearch(form) {
            const timestamp = +this.$route.params.timestamp
            const searchParams = utils.helps.clearEmptyAttr(form)
            const params = {
                merchantId: this.currentMerchantId,
                reconciliationDate: this.$dayjs(timestamp).format('YYYY-MM-DD'),
                ...searchParams
            }
            this.getRecommendedAbnormalPayRecordList(params)
        },

        sync(statement) {
            const timestamp = +this.$route.params.timestamp
            const params = {
                merchantId: this.currentMerchantId,
                payRecordId: statement.payRecordId,
                billNumber: this.order.billNumber,
                storeCode: this.storeCode,
                year: this.$dayjs(timestamp).year(),
                month: this.$dayjs(timestamp).month() + 1,
                date: this.$dayjs(timestamp).date()
            }
            this.syncCheckedStatement(params)
                .then(() => {
                    this.$message({
                        message: '同步成功',
                        type: 'success'
                    })
                })
                .finally(() => {
                    this.closeConfirmPopover(statement)
                })
        }
    }
}
</script>

<style scoped lang="scss">
.emptyContainer {
    @extend %flex-center-col
}
</style>
