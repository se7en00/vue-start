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
            padding: 30px 30px 20px;
            background-color: $breadCrumb-bg;
            /deep/ .el-breadcrumb__item:not(:last-of-type) {
                .router-link-active, .el-breadcrumb__separator {
                    color: $breadCrumb-active-link !important;
                }
            }
        }
    }
</style>
