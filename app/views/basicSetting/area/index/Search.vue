<template>
    <el-form
        :inline="true"
        ref="searchForm"
        :model="searchForm"
        label-width="80px">
        <el-form-item>
            <el-input
                v-model="searchForm.key"
                @keyup.enter.native="handleFormSubmit"
                placeholder="区域编码/区域名称"/>
        </el-form-item>

        <!-- <el-form-item>
            <el-button
                type="primary"
                @click="handleFormSubmit">
                搜索
            </el-button>
        </el-form-item> -->

        <el-form-item style="float: right">
            <el-button
                type="primary"
                @click="createNewStore">
                添加区域
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            searchForm: {
                key: ''
            }
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

        createNewStore() {
            this.$router.push({
                name: 'merchant-baseSetting-area-new'
            })
        }
    }
}
</script>
