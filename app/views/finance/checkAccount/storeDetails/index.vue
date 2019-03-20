<template>
    <main-container :searchHeight="searchHeight">
        <order-search
            ref="search"
            slot="search"
            @submit="search"
        />

        <order-list
            :tableData="list"
            :expands="expands"
            ref="list"/>
    </main-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import StatementSearch from './StatementSearch'
export default {
    name: 'index',
    props: ['timestamp', 'storeCode'],
    provide() {
        return {
            storeCode: this.storeCode
        }
    },
    data() {
        return {
            searchHeight: '60px'
        }
    },
    computed: {
        ...mapGetters(['currentMerchantId']),
        ...mapState({
            list: state => state.finance.checkAccount.storeStatementDetails,
            originalList: state => state.finance.checkAccount.originalStoreStatementDetails,
            expands: state => state.finance.checkAccount.expands
        })
    },
    components: {
        'order-search': () => import('./Search'),
        'order-list': () => import('./OrderList')
    },
    created() {
        // const routers = this.$route.matched
        // if (routers && routers.length) {
        //     const currentRoute = routers[ routers.length - 1 ]
        //     currentRoute.meta.breadCrumbs = `门店(${this.$route.query.storeName})`
        // }
        const params = {
            merchantId: this.currentMerchantId,
            storeCode: this.storeCode,
            year: this.$dayjs(+this.timestamp).year(),
            month: this.$dayjs(+this.timestamp).month() + 1,
            date: this.$dayjs(+this.timestamp).date()
        }
        this.getStoreStatementDetails(params)
    },
    methods: {
        ...mapActions([
            'getStoreStatementDetails',
            'syncUpdateCheckedStatementDetails',
            'syncClearExpands'
        ]),

        search(param) {
            // 重置
            if (R.isEmpty(param)) {
                const params = {
                    merchantId: this.currentMerchantId,
                    storeCode: this.storeCode,
                    year: this.$dayjs(+this.timestamp).year(),
                    month: this.$dayjs(+this.timestamp).month() + 1,
                    date: this.$dayjs(+this.timestamp).date()
                }
                this.getStoreStatementDetails(params)
            } else {
                // 查询
                const clientSearch = new StatementSearch(param)
                const results = clientSearch.search(this.originalList)
                this.syncUpdateCheckedStatementDetails(results)
            }
            this.syncClearExpands()
        }
    }
}
</script>

<style scoped lang="scss">
.container-full__search {
    flex: 0 0 60px !important;
}
</style>
