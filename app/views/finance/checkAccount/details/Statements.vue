<template>
    <main-container>
        <statement-search
            ref="search"
            slot="search"
            :statementDate="statementDate"
            @submit="search"/>

        <statement-list :tableData="list" :timer.sync="timer" ref="list"/>
    </main-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'Statements',
    components: {
        'statement-search': () => import('./StatementSearch'),
        'statement-list': () => import('./StatementList')
    },
    props: {
        timestamp: {
            default: '1548172800000'
        }
    },
    data() {
        return {
            timer: ''
        }
    },
    beforeRouteLeave(to, from, next) {
        // 清除同步轮询的请求
        clearTimeout(this.timer)
        next()
    },
    created() {
        const params = {
            merchantId: this.currentMerchantId,
            year: this.$dayjs(+this.timestamp).year(),
            month: this.$dayjs(+this.timestamp).month() + 1,
            date: this.$dayjs(+this.timestamp).date()
        }
        this.getStoreCheckedStatements(params)
    },
    computed: {
        ...mapGetters(['currentMerchantId']),
        ...mapState({
            list: state => state.finance.checkAccount.storeStatements
        }),
        statementDate() {
            return this.$dayjs(+this.timestamp).format('YYYY年MM月DD日')
        }
    },
    methods: {
        ...mapActions([
            'getStoreCheckedStatements'
        ]),

        search(params) {
            const queryParams = {
                ...params,
                merchantId: this.currentMerchantId,
                year: this.$dayjs(+this.timestamp).year(),
                month: this.$dayjs(+this.timestamp).month() + 1,
                date: this.$dayjs(+this.timestamp).date()
            }
            this.getStoreCheckedStatements(queryParams)
        }
    }
}
</script>

<style scoped>

</style>
