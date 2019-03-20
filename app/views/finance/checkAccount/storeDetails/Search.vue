<template>
    <el-form
        :inline="true"
        ref="searchForm"
        :model="searchForm"
        class="checkSheetSearchForm"
        style="width: 100%"
        label-width="80px">
        <div style="font-size: 14px; margin-bottom: 10px">
            <label> {{$route.query.storeName}}: {{choiceData}}</label>
        </div>
        <el-row type="flex" :gutter="20" style="margin-right: 0">
            <el-col :span="6">
                <el-form-item>
                    <el-input
                        clearable
                        size="small"
                        @keyup.enter.native="handleFormSubmit"
                        v-model.trim="searchForm.billNumber"
                        placeholder="订单编号"/>
                </el-form-item>
            </el-col>

            <el-col :span="6">
                <el-form-item>
                    <el-select
                        style="width: 100%"
                        size="small"
                        clearable
                        v-model="searchForm.orderType"
                        placeholder="订单类型">
                        <el-option
                            v-for="orderCategory in orderCategoryOptions"
                            :key="orderCategory.value"
                            :label="orderCategory.label"
                            :value="orderCategory.value"/>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="6">
                <el-form-item>
                    <el-select
                        v-model="searchForm.checkResult"
                        size="small"
                        clearable
                        style="width: 100%"
                        placeholder="对账状态">
                        <el-option
                            v-for="status in statementStatusOptions"
                            :key="status.value"
                            :label="status.label"
                            :value="status.value"/>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-popover
                placement="bottom"
                size="small"
                width="200"
                class="u-mr-20 u-ml-20"
                trigger="click">

                <el-form-item label="收单通道">
                    <el-select
                        style="width: 100%"
                        clearable
                        filterable
                        v-model="searchForm.payChannel"
                        placeholder="收单通道">
                        <el-option
                            v-for="payChannel in payChannels"
                            :key="payChannel.value"
                            :label="payChannel.label"
                            :value="payChannel.value"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="结算方式">
                    <el-select
                        size="small"
                        style="width: 100%"
                        clearable
                        filterable
                        v-model="searchForm.settlementCode"
                        placeholder="结算方式">
                        <el-option
                            v-for="settlement in settlements"
                            :key="settlement.value"
                            :label="settlement.label"
                            :value="settlement.value"/>
                    </el-select>
                </el-form-item>

                <!--<el-form-item label="来源终端">-->
                <!--<el-input-->
                <!--v-model="searchForm.source"-->
                <!--placeholder="来源终端"/>-->
                <!--</el-form-item>-->
                <el-button size="small" slot="reference">更多条件</el-button>
            </el-popover>

            <el-button
                type="primary"
                size="small"
                @click="handleFormSubmit">
                查询
            </el-button>
            <el-button
                type="danger"
                size="small"
                @click="reset">
                重置
            </el-button>
        </el-row>
    </el-form>
</template>

<script>
import {
    ORDER_CATEGORY,
    PAY_CHANNEL,
    STATEMENT_STATUS
} from '@/constants/index'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            isLoading: false,
            orderCategoryOptions: ORDER_CATEGORY,
            statementStatusOptions: STATEMENT_STATUS,
            payChannels: PAY_CHANNEL,
            searchForm: {
                billNumber: '',
                payChannel: '', // 支付方式
                orderType: '', // 订单类型
                settlementCode: '',
                checkResult: ''
            }
        }
    },
    computed: {
        ...mapState({
            settlements: state => state.finance.checkAccount.settlements
        }),
        choiceData() {
            return this.$dayjs(+this.$route.params.timestamp).format('YYYY-MM-DD')
        }
    },
    methods: {
        handleFormSubmit(params) {
            this.$refs.searchForm.validate((valid) => {
                if (valid) {
                    this.$emit('submit', { ...this.searchForm, ...params })
                } else {
                    return false
                }
            })
        },

        reset() {
            this.$refs['searchForm'].resetFields()
            this.searchForm = {}
            this.$emit('submit', {})
        }
    }
}
</script>

<style scoped lang="scss">
    .checkSheetSearchForm {
        padding: 20px 0;
        /deep/.el-form--inline {
            .el-form-item {
                display: flex;
                flex-flow: column;
                margin: 0;
            }
        }
        /deep/ .el-date-editor--datetimerange.el-input__inner, .el-autocomplete {
            width: 100%;
        }

        /deep/ .el-form-item {
            /*display: flex !important;*/
            /*flex-flow: column nowrap;*/
            @include e(content) {

            }
        }
    }

</style>
