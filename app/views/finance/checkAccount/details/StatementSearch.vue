<template>
    <el-form
        :inline="true"
        ref="searchForm"
        :model="searchForm"
        class="statementSearchForm"
        label-width="80px">
        <el-row type="flex" :gutter="20" justify="end" style="margin: 0">
            <div class="statementTime">
                <label>对账日期：{{statementDate}}</label>
            </div>
            <el-col :span="6">
                <el-form-item>
                    <el-autocomplete
                        v-model="storeName"
                        size="small"
                        clearable
                        @clear="clearStoreCriteria"
                        value-key="label"
                        :trigger-on-focus="toggleAutoComplete"
                        :fetch-suggestions="querySearchStoreAsync"
                        placeholder="搜索相关的所属门店"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
            </el-col>

            <el-col :span="6">
                <el-form-item>
                    <el-select
                        v-model="searchForm.checkResult"
                        size="small"
                        clearable
                        style="width: 100%"
                        placeholder="对账结果">
                        <el-option
                            v-for="status in statementResultOptions"
                            :key="status.value"
                            :label="status.label"
                            :value="status.value"/>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-button
                type="primary"
                size="small"
                @click="handleFormSubmit">
                查询
            </el-button>
        </el-row>
    </el-form>
</template>

<script>
import utils from '@/utils'
import { STATEMENT_RESULT } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Search',
    props: ['statementDate'],
    data() {
        return {
            isLoading: false,
            statementResultOptions: STATEMENT_RESULT,
            toggleAutoComplete: false,
            dataTime: '',
            storeName: '',
            searchForm: {
                // store: '', // 当前糊模搜索的门店
                storeCode: '',
                checkResult: ''
            }
        }
    },
    computed: {
        ...mapGetters(['currentMerchantId'])
    },
    methods: {
        ...mapActions(['loadStoreList']),
        handleFormSubmit(params) {
            this.$refs.searchForm.validate((valid) => {
                if (valid) {
                    const searchParams = utils.helps.clearEmptyAttr(this.searchForm)
                    if (!this.storeName) {
                        searchParams.storeCode = ''
                    }
                    if ((typeof (searchParams.storeCode) === 'undefined' || searchParams.storeCode === '') && this.storeName) {
                        searchParams.storeCode = this.storeName
                    }
                    this.$emit('submit', { ...searchParams, ...params })
                } else {
                    return false
                }
            })
        },

        reset() {
            this.$refs['searchForm'].resetFields()
            this.searchForm = {}
            this.$emit('submit', {})
        },

        /**
             *  auto search
             * @param storeName 搜索门店
             * @param callback 回调异步数据
             */
        querySearchStoreAsync(storeName, callback) {
            if (!storeName) {
                return
            }
            this.toggleAutoComplete = true
            this.loadStoreList({ key: storeName, size: 100, merchantId: this.currentMerchantId })
                .then(res => {
                    const searchMerchants = res.dataList.map(store => ({ label: store.name, storeCode: store.code }))
                    if (!searchMerchants || searchMerchants.length === 0) {
                        searchMerchants.push({ label: '暂无数据', storeCode: '' })
                    }
                    callback(searchMerchants)
                })
                .finally(() => { this.toggleAutoComplete = false })
        },

        clearStoreCriteria() {
            this.searchForm.storeCode = ''
        },

        handleSelect(item) {
            if (item.storeCode === '') {
                this.searchForm.storeCode = ''
                this.$set(this, 'storeName', '')
            } else {
                this.searchForm.storeCode = item.storeCode
            }
        }

    }
}
</script>

<style scoped lang="scss">
    .statementSearchForm {
        width: 100%;
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
    }

    .statementTime {
        position: absolute;
        left: 10px;
        /*line-height: 20px;*/
        font-size: 14px;
    }

</style>
