<template>
    <el-menu-item :index="menu.path || uniqueId">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <!--<d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>-->
        <i v-else class="dot-circle"></i>
        <span class="title" slot="title">{{menu.title || '未命名菜单'}}</span>
    </el-menu-item>
</template>

<script>

export default {
    name: 'menu-item',
    props: {
        menu: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data() {
        return {
            uniqueId: _.uniqueId('menu-empty-')
        }
    }
}
</script>
<style lang="scss">
    .title {
        margin-left: 15px;
    }
    .dot-circle {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: $sidebar-subItem-circle-bg;
        border-radius: 50%;
    }
</style>
