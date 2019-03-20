<template>
    <el-table
        :data="currentTableData"
        stripe
        v-loading="loading"
        :element-loading-text="syncStatus"
        element-loading-background="rgba(238, 238, 238, 0.7)"
        height="100%"
        highlight-current-row
        style="width: 100%;">

        <el-table-column label="门店编码" prop="storeCode" align="center">
        </el-table-column>

        <el-table-column label="门店名称" prop="storeName" align="left" :show-overflow-tooltip="true">

        </el-table-column>

        <el-table-column label="订单交易总金额" prop="thirdPartyPayAmount" align="center">
            <template slot-scope="scope">
                {{$fMoney(scope.row.thirdPartyPayAmount)}}
            </template>
        </el-table-column>

        <el-table-column label="对账结果" prop="result" align="center">
            <template slot-scope="scope">
                <el-tag type="danger" v-if="!scope.row.checkResult">{{$mappingValue(scope.row.checkResult)(statementResultOptions)}}</el-tag>
                <el-tag type="success" v-else>{{$mappingValue(scope.row.checkResult)(statementResultOptions)}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="交易对账总金额" prop="thirdPartyCheckAmount" align="center">
            <template slot-scope="scope">
                {{$fMoney(scope.row.thirdPartyCheckAmount)}}
            </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)" title="查看明细">门店明细</el-button>
                <el-button type="text" @click="syncOrderInfo(scope.row)" title="同步订单">同步订单</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { STATEMENT_RESULT } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        tableData: {
            default: () => []
        },
        timer: [String, Number]
    },
    data() {
        return {
            loading: false,
            syncStatus: '',
            statementResultOptions: STATEMENT_RESULT,
            currentTableData: []
        }
    },
    computed: {
        ...mapGetters(['currentMerchantId'])
    },
    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions([
            'syncOrder'
        ]),
        edit(store) {
            this.$router.push({
                name: 'merchant-finance-checkAccount-statements-storeDetail',
                params: { storeCode: store.storeCode },
                query: { storeName: store.storeName }
            })
        },

        syncOrderInfo(order) {
            const params = {
                merchantId: this.currentMerchantId,
                year: this.$dayjs(+this.$route.params.timestamp).year(),
                month: this.$dayjs(+this.$route.params.timestamp).month() + 1,
                date: this.$dayjs(+this.$route.params.timestamp).date(),
                storeCode: order.storeCode,
                reconciliationDate: this.$dayjs(+this.$route.params.timestamp).format('YYYY-MM-DD')
            }
            this.loading = true
            this.syncStatus = `${order.storeName}正在同步中,请耐心等待！`
            this.syncOrder({ params, vm: this, delay: 2000 })
                .then(res => {
                    this.$message({
                        message: `同步成功，更新${res.syncNumber}条订单`,
                        type: 'success'
                    })
                })
                .catch(() => {
                    this.$message({
                        message: '同步失败，请稍后尝试',
                        type: 'error'
                    })
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }
}
</script>
