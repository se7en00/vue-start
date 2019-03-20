<template>
    <el-dialog
        title="对账匹配"
        width="1200px"
        custom-class="tableDialog"
        :before-close="handleClose"
        :visible.sync="isShowDialog">
        <el-form
            :inline="true"
            label-position="left"
            ref="matchedDialogForm"
            label-width="150px"
            :model="matchedDialogForm">
            <el-row type="flex" :gutter="20" style="margin-right: 0">
                <el-col :span="6">
                    <el-form-item label="对账金额" prop="checkAmount" :rules="[{type: 'number', message: '对账金额必须为数字值'}]">
                        <el-input
                            clearable
                            size="small"
                            v-model.number.trim="matchedDialogForm.checkAmount"
                            placeholder="对账金额"/>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="通道交易流水号">
                        <el-input
                            clearable
                            size="small"
                            v-model.trim="matchedDialogForm.tradeNumber"
                            placeholder="通道交易流水号"/>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="收单通道">
                        <el-select
                            style="width: 100%"
                            size="small"
                            clearable
                            v-model="matchedDialogForm.payChannel"
                            placeholder="收单通道">
                            <el-option
                                v-for="payChannel in payChannelOptions"
                                :key="payChannel.value"
                                :label="payChannel.label"
                                :value="payChannel.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="通道门店名称">
                        <el-input
                            clearable
                            size="small"
                            v-model.trim="matchedDialogForm.storeName"
                            placeholder="通道门店名称"/>
                    </el-form-item>
                </el-col>

                <el-col :span="2" style="display: flex; align-items: flex-end">
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleSearch"
                            size="small">
                            查询
                        </el-button>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>
        <el-table
            :data="list"
            size="mini"
            height="490"
            stripe
            highlight-current-row
            style="width: 100%;"
        >

            <el-table-column prop="tradeNumber" align="center" label="通道交易流水号" min-width="150" ></el-table-column>
            <el-table-column prop="billNumber" align="center" label="外部跟踪编号" min-width="150" ></el-table-column>
            <el-table-column prop="payChannel" align="center" label="收单通道" min-width="150" :formatter="formatterPayChannel"></el-table-column>
            <el-table-column prop="payType" align="center" label="支付方式" :formatter="formatterPayType">
            </el-table-column>
            <el-table-column prop="thirdPartyCheckAmount" align="center" label="对账金额">
                <template slot-scope="scope">
                    {{$fMoney(scope.row.thirdPartyCheckAmount)}}
                </template>
            </el-table-column>
            <el-table-column prop="storeName" align="center" width="200px" label="通道门店名称">
                <template slot-scope="scope">
                    {{scope.row.storeName ? scope.row.storeName : '无'}}
                </template>
            </el-table-column>
            <el-table-column prop="payTime" align="left" label="支付时间"></el-table-column>
            <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                    <el-badge v-if="scope.row.recommended" value="推荐" class="item">
                        <el-button type="text" @click="handleSelect(scope.row)">选择</el-button>
                    </el-badge>
                    <el-button v-else type="text" @click="handleSelect(scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { PAY_CHANNEL } from '@/constants'
import formatterPayType from '../mixins/formatterPayType'
export default {
    name: 'PaymentMatchedDialog',
    props: ['dialogVisible'],
    mixins: [formatterPayType],
    data() {
        return {
            payChannelOptions: PAY_CHANNEL,
            matchedDialogForm: {}
        }
    },

    computed: {
        ...mapGetters(['currentMerchantId']),
        ...mapState({
            list: state => state.finance.recommendedAbnormalPayRecord.list
        }),
        isShowDialog: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        }
    },

    methods: {
        /**
         * 选择
         */
        handleSelect(record) {
            this.$emit('match', record)
        },

        close() {
            this.$refs.matchedDialogForm.resetFields()
            this.isShowDialog = false
        },

        handleClose() {
            this.$refs.matchedDialogForm.resetFields()
            this.isShowDialog = false
        },

        handleSearch() {
            if (!this.matchedDialogForm.checkAmount) {
                this.$refs.matchedDialogForm.clearValidate()
                this.$emit('search', this.matchedDialogForm)
            } else {
                this.$refs['matchedDialogForm'].validate((valid) => {
                    if (valid) {
                        this.$emit('search', this.matchedDialogForm)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.item{
    margin-top: 10px;
}
</style>
