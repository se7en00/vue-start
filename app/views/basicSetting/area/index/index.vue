<template>
    <main-container>
        <template slot="search">
            <div class="actions">
                <el-input
                    size="small"
                    class="u-mr-10"
                    clearable
                    v-model="searchForm.key"
                    @clear="reset"
                    @keyup.enter.native="search"
                    placeholder="查询 区域编码/区域名称">
                    <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button
                    type="danger"
                    size="small"
                    @click="createNewArea">
                    添加区域
                </el-button>
            </div>
        </template>
        <store-list
            :tableData="list"
            ref="list"/>
        <el-pagination
            v-if="pagination.totalNumber && pagination.totalNumber !== 0"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-size="pagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination.totalNumber">
        </el-pagination>
    </main-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    components: {
        'store-list': () => import('./List')
    },
    data() {
        return {
            searchForm: {
                key: ''
            }
        }
    },
    computed: {
        ...mapGetters(['currentMerchantId']),
        ...mapState({
            list: state => state.basicSetting.area.list,
            pagination: state => state.basicSetting.area.pagination
        }),
        headers() {
            const token = localStorage.getItem('token')
            const phoneNumber = localStorage.getItem('phoneNumber')
            return {
                'X-AUTH-TOKEN': token,
                'X-AUTH-KEY': phoneNumber,
                'X-MERCHANT-ID': this.currentMerchantId
            }
        }
    },
    mounted() {
        this.loadAreaList({ merchantId: this.currentMerchantId })
    },
    methods: {
        ...mapActions([
            'loadAreaList'
        ]),

        createNewArea() {
            this.$router.push({
                name: 'merchant-baseSetting-area-new'
            })
        },

        reset() {
            this.loadAreaList({ merchantId: this.currentMerchantId })
        },

        search(params) {
            const queryParams = {
                ...params,
                ...this.searchForm,
                merchantId: this.currentMerchantId
            }
            this.loadAreaList(queryParams)
        },

        /**
             *  当前页的变更
             */
        handleCurrentChange(currentPage) {
            const params = {
                page: currentPage,
                ...this.searchForm,
                merchantId: this.currentMerchantId
            }
            this.loadAreaList(params)
        }
    }
}
</script>
