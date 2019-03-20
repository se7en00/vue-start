<template>
    <div>
        <payment-list
            :tableData="expandedData"
            :order="$attrs.order"
        />

        <payment-history-list
            :tableData="expandedData"
            :order="$attrs.order"
            v-if="$attrs.order.isModify"
        />
    </div>
</template>

<script>
import PaymentList from './PaymentList'
import PaymentHistoryList from './PaymentHistoryList'
export default {
    inheritAttrs: false,
    components: {
        'payment-list': PaymentList,
        'payment-history-list': PaymentHistoryList
    },
    props: {
        expandedData: {
            default: () => []
        }
    }
}
</script>

<style scoped>

</style>
