<template>
    <el-submenu :index="menu.path || uniqueId" class="subMenu">
        <template slot="title">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <!--<d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>-->
            <span class="subMenu__title" slot="title">{{menu.title}}</span>
        </template>
        <template v-for="(child, childIndex) in menu.children">
            <menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
            <menu-sub-item v-else :menu="child" :key="childIndex"/>
        </template>
    </el-submenu>
</template>

<script>
import MenuItem from '../menu-item'

export default {
    name: 'menu-sub-item',
    components: {
        'menu-item': MenuItem
    },
    props: {
        menu: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data() {
        return {
            uniqueId: _.uniqueId('sub-menu-empty-')
        }
    }
}
</script>
<style scoped="scoped" lang="scss">
    .subMenu {
        @include e(title) {
            margin-left: 25px;
        }
        /deep/ .el-submenu__title {
            padding-left: 20px !important;
        }
        /deep/ .el-menu.el-menu--inline {
            .el-menu-item {
                padding-left: 40px !important;
            }
        }
    }
</style>
