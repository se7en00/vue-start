<template>
    <el-table
        :data="currentTableData"
        ref="orderTable"
        highlight-current-row
        stripe
        @row-click="expandedRow"
        :row-key="getRowKeys"
        :expand-row-keys="expandList"
        :span-method="arraySpanMethod"
        @expand-change="handelExpandChange"
        style="width: 100%;">
        <el-table-column type="expand">
            <template slot-scope="props">
                <expanded-panel
                    :order="props.row"
                    :expandedData="props.row.orderCheckPayRecordDTOList"
                />
            </template>
        </el-table-column>

        <el-table-column label="订单编号" prop="billNumber" align="center">
            <template slot-scope="scope">
                <p v-if="scope.row.checkResult === cashOverValue">未找到对应订单数据</p>
                <p v-else>{{scope.row.billNumber}}</p>
            </template>
        </el-table-column>

        <el-table-column label="交易时间" prop="billDate" align="center">
            <template slot-scope="scope">
                {{scope.row.billDate ? $dayjs(scope.row.billDate).format('YYYY-MM-DD HH:mm:ss') : ''}}
            </template>
        </el-table-column>

        <el-table-column label="订单来源" prop="source" align="center">
        </el-table-column>

        <el-table-column label="订单类型" prop="orderType" align="center">
            <template slot-scope="scope">
                {{$mappingValue(scope.row.orderType)(orderCategories)}}
            </template>
        </el-table-column>

        <el-table-column label="关联原小票单号" prop="originBillNumber" align="center">
        </el-table-column>

        <el-table-column label="结算方式" align="center">
            <template slot-scope="scope">
                <p :key="index" v-for="(checkItem, index) in scope.row.orderCheckPayRecordDTOList">
                    {{checkItem.name}}
                </p>
            </template>
        </el-table-column>

        <el-table-column label="交易金额" align="center">
            <template slot-scope="scope">
                <p :key="index" v-for="(checkItem, index) in scope.row.orderCheckPayRecordDTOList">
                    {{$fMoney(checkItem.thirdPartyPayAmount)}}
                </p>
            </template>
        </el-table-column>

        <el-table-column label="对账状态" prop="checkResult" align="center" :render-header="renderCheckResultHeader">
            <template slot-scope="scope">
                <!--<el-tag :type="statementStatusColors[scope.row.checkResult]">{{$mappingValue(scope.row.checkResult)(statementStatusOptions)}}</el-tag>-->
                {{$mappingValue(scope.row.checkResult)(statementStatusOptions)}}
                {{scope.row.isManualCheck && scope.row.checkResult === checkSuccessfully ? '(平)' : ''}}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {
    STATEMENT_STATUS,
    STATEMENT_STATUS_COLORFUL,
    ORDER_CATEGORY,
    STATEMENT_STATUS_MAPPING
} from '@/constants'
import { mapActions } from 'vuex'
import ExpandedPanel from './ExpandedPanel'
export default {
    name: 'orderList',
    components: {
        'expanded-panel': ExpandedPanel
    },
    props: {
        tableData: {
            default: () => []
        },
        expands: {
            default: () => []
        },
        loading: {
            default: false
        }
    },
    data() {
        return {
            statementStatusOptions: STATEMENT_STATUS,
            statementStatusColors: STATEMENT_STATUS_COLORFUL,
            orderCategories: ORDER_CATEGORY,
            cashOverValue: STATEMENT_STATUS_MAPPING.cashOver, // 长款
            checkSuccessfully: STATEMENT_STATUS_MAPPING.success, // 对账成功
            currentTableData: [],
            expandList: [],
            isExpanded: false
        }
    },

    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val.map(item => {
                    if (this.checkSuccessfully === item.checkResult && item.orderCheckPayRecordDTOList.length) {
                        item.isModify = item.orderCheckPayRecordDTOList.some(statement => statement.isModify)
                    }
                    return item
                })
            },
            immediate: true
        },
        expands: {
            handler(val) {
                this.expandList = val
            },
            immediate: true
        }
    },

    methods: {
        ...mapActions([
            'syncUpdateExpands'
        ]),
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (row.checkResult === this.cashOverValue) {
                if (columnIndex === 1) {
                    return [1, 7]
                } else if (columnIndex >= 2 && columnIndex <= 7) {
                    return [0, 0]
                }
            }
        },

        getRowKeys(row) {
            return row.billNumber
        },

        expandedRow(row) {
            this.isExpanded = !this.isExpanded
            this.$refs.orderTable.toggleRowExpansion(row, this.isExpanded)
        },

        handelExpandChange(row) {
            this.syncUpdateExpands(row.billNumber)
        },

        renderCheckResultHeader(createElement, { column }) {
            return (
                <span>
                    {column.label}
                    <el-tooltip placement="bottom-end">
                        <div slot="content">
                            <p style="padding: 5px">短款：有订单未找到对账记录</p>
                            <p style="padding: 5px">长款：有对账记录未找到订单</p>
                            <p style="padding: 5px">金额不一致：订单与对账单匹配但金额不一致</p>
                            <p style="padding: 5px">对账成功(平)：人为干涉后对账成功的状态</p>
                        </div>
                        <span class="toolTipTitle"/>
                    </el-tooltip>
                </span>
            )
        }
    }
}
</script>

<style>
    .toolTipTitle {
        position: relative;
    }
    .toolTipTitle::after {
        position: absolute;
        content: '?';
        cursor: pointer;
        vertical-align: middle;
        line-height: 16px;
        color: #fff;
        border-radius: 50%;
        padding-left: 1px;
        width: 15px;
        height: 15px;
        font-size: 12px;
        font-weight: bold;
        background: #909399;
        bottom: 3px
    }
</style>
