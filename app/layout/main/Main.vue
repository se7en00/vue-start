<template>
    <div class="main-container">
        <BreadCrumb class="main-container__breadCrumb"/>
        <router-view/>
    </div>
</template>

<script>
import BreadCrumb from '@/layout/breadcrumb/BreadCrumb'
export default {
    name: 'Main',
    components: {
        BreadCrumb
    }
}
</script>
<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-flow: column;
        flex: 1 2;
        width: 100%;
        height: 100%;
        overflow: hidden;
        @include e(breadCrumb) {
            flex: 0 0 ;
            padding: 7px 16px 6px;
            background-color: $body-bg;
            /deep/ .el-breadcrumb__item:not(:last-of-type) {
                .router-link-active, .el-breadcrumb__separator, .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
                    color: $breadCrumb-active-link !important;
                }
            }
        }
    }
</style>
