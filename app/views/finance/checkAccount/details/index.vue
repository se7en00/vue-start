<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'index'
    // props: ['timestamp'],
    // computed: {
    //     statementDate() {
    //         return this.$dayjs(+this.timestamp).format('YYYY-MM-DD')
    //     }
    // },
    // created() {
    //     const routers = this.$route.matched
    //     if (routers && routers.length) {
    //         const currentRoute = routers[ routers.length - 2 ]
    //         currentRoute.meta.breadCrumbs = `${this.statementDate}对账明细`
    //     }
    // }
}
</script>
