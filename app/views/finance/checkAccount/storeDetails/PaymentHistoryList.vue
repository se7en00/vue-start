<template>
    <div class="expandedPanel__card u-mt-30">
        <div class="card__header">
            <span class="title">对账单调整记录</span>
        </div>
        <div class="card__body">
            <el-table
                highlight-current-row
                :data="currentTableData"
                style="width: 100%;">

                <el-table-column label="外部跟踪编号" prop="originRelatedBillNumber" align="center">
                </el-table-column>

                <el-table-column label="收单通道" prop="payChannel" align="center" :formatter="formatterPayType">
                </el-table-column>

                <el-table-column label="支付方式" prop="payType" align="center" :formatter="formatterPayType">
                </el-table-column>

                <el-table-column label="手续费" prop="commissionAmount" align="center">
                </el-table-column>

                <el-table-column label="交易流水号" prop="tradeNumber" align="center">
                </el-table-column>

                <el-table-column label="支付完成时间" prop="payFinishTime" align="center">
                    <template slot-scope="scope">
                        {{scope.row.payFinishTime ? $dayjs(scope.row.payFinishTime).format('YYYY-MM-DD HH:mm:ss') : ''}}
                    </template>
                </el-table-column>

                <el-table-column label="对账金额" prop="originThirdPartyCheckAmount" align="center">
                    <template slot-scope="scope">
                        {{$fMoney(scope.row.originThirdPartyCheckAmount)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import formatterPayType from '../mixins/formatterPayType'
export default {
    name: 'PaymentHistoryList',
    mixins: [formatterPayType],
    props: {
        tableData: {
            default: () => []
        },
        order: {
            default: () => {}
        }
    },
    data() {
        return {
            currentTableData: []
        }
    },

    watch: {
        tableData: {
            handler(val) {
                if (this.order && this.order.isModify && val.length) {
                    this.currentTableData = val
                }
            },
            immediate: true
        }
    }
}
</script>
