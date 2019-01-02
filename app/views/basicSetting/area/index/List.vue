<template>
    <el-table
        :data="currentTableData"
        highlight-current-row
        style="width: 100%;">

        <el-table-column label="区域编码" prop="code" align="left" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column label="区域名称" prop="name" align="left" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column label="联系电话" prop="contactNumber" align="left" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
                <el-button size="mini" type="info" icon="el-icon-edit" @click="edit(scope.row.id)" circle title="编辑"></el-button>
                <el-popover
                    placement="top"
                    width="160"
                    :value="storeIdsMap[scope.row.id]">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="closeConfirmPopover(scope.row.id)">取消</el-button>
                        <el-button type="primary" size="mini" @click="removeStore(scope)">确定</el-button>
                    </div>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="openConfirmPopover(scope.row.id)" circle slot="reference" title="删除"></el-button>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
        tableData: {
            default: () => []
        },
        loading: {
            default: false
        }
    },
    data() {
        return {
            currentTableData: [],
            storeIdsMap: {}
        }
    },

    computed: {
        ...mapGetters(['currentMerchantId'])
    },

    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
                // 转化成map
                this.storeIdsMap = this.currentTableData.reduce((map, item) => R.assoc(item.id, false, map), {})
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(['deleteArea']),
        edit(areaId) {
            this.$router.push({
                name: 'merchant-baseSetting-area-details',
                params: { areaId: areaId }
            })
        },
        /**
             *  打开Popover 弹出框
             */
        openConfirmPopover(id) {
            if (!this.storeIdsMap) return
            this.storeIdsMap[id] = true
        },

        /**
             * 关闭Popover 弹出框
             */
        closeConfirmPopover(id) {
            if (!this.storeIdsMap) return
            this.storeIdsMap[id] = false
        },

        removeStore(scope) {
            this.deleteArea({ id: scope.row.id, merchantId: this.currentMerchantId })
                .then(() => {
                    this.$message({
                        message: `成功删除门店${scope.row.name}`,
                        type: 'success'
                    })
                    this.closeConfirmPopover(scope.row.id)
                })
                .catch(() => {
                    this.closeConfirmPopover(scope.row.id)
                })
        }
    }
}
</script>

<style scoped>

</style>
