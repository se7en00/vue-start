<template>
    <el-dialog
        :title="title"
        width="600px"
        :visible.sync="isShowDialog">
        <el-form
            style="padding: 0 90px"
            ref="dialogForm"
            label-width="150px"
            :model="dialogForm"
            :rules="rules">
            <el-form-item label="订单编号">
                <el-input v-model="dialogForm.orderNumber" placeholder="请输入订单编号" disabled></el-input>
            </el-form-item>

            <el-form-item label="支付机构金额">
                <el-input v-model="dialogForm.thirdPartyPayAmount" placeholder="请输支付机构金额" disabled></el-input>
            </el-form-item>

            <hr style="position: relative; left: -18%; width: 130%"/>

            <el-form-item label="外部跟踪编号" prop="originRelatedBillNumber">
                <el-input v-model="dialogForm.originRelatedBillNumber" placeholder="请输入账单订单编号"></el-input>
            </el-form-item>

            <el-form-item label="支付机构对账金额" prop="originThirdPartyCheckAmount" class="numberInput">
                <el-input type="number" v-model.number="dialogForm.originThirdPartyCheckAmount" placeholder="请输支付机构对账金额"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
import utils from '@/utils'
import { STATEMENT_STATUS } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'EditDialog',
    props: ['dialogVisible', 'order', 'statement'],
    inject: ['storeCode'],
    data() {
        return {
            dialogForm: {
                orderNumber: '',
                thirdPartyPayAmount: '',
                originRelatedBillNumber: '',
                originThirdPartyCheckAmount: ''
            },
            rules: {
                originRelatedBillNumber: [
                    { required: true, message: '请输入账单订单编号', trigger: 'blur' }
                ],
                originThirdPartyCheckAmount: [
                    { required: true, message: '请输支付机构对账金额', trigger: 'blur' },
                    { type: 'number', message: '支付机构对账金额必须为数字值' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['currentMerchantId']),
        title() {
            return `修改(${utils.helps.mappingValue(this.order.checkResult)(STATEMENT_STATUS)})`
        },
        isShowDialog: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        }
    },
    watch: {
        statement: {
            handler(val) {
                let { billNumber: orderNumber, thirdPartyPayAmount, isModify, originRelatedBillNumber,
                    originThirdPartyCheckAmount, modifyRelatedBillNumber, modifyThirdPartyCheckAmount } = val
                originRelatedBillNumber = isModify ? modifyRelatedBillNumber : originRelatedBillNumber
                originThirdPartyCheckAmount = isModify ? modifyThirdPartyCheckAmount : originThirdPartyCheckAmount
                Object.assign(this.dialogForm, { orderNumber, thirdPartyPayAmount: this.$fMoney(thirdPartyPayAmount), originRelatedBillNumber, originThirdPartyCheckAmount })
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions([
            'updateCheckedStatement'
        ]),
        save() {
            const params = {
                merchantId: this.currentMerchantId,
                storeCode: this.storeCode,
                checkResult: this.order.checkResult,
                payRecordId: this.statement.payRecordId,
                relatedBillNumber: this.dialogForm.originRelatedBillNumber,
                thirdPartyCheckAmount: this.dialogForm.originThirdPartyCheckAmount
            }
            this.updateCheckedStatement(params)
                .then(() => {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.close()
                })
        },

        close() {
            this.isShowDialog = false
            this.$refs['dialogForm'].clearValidate()
        }
    }
}
</script>

<style scoped lang="scss">
.numberInput {
    /deep/ .el-input__inner {
        padding-right:  0!important;
    }
}
</style>
