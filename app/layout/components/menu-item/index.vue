<template>
    <el-menu-item :index="menu.path || uniqueId" style="padding-left: 16px">
        <i v-if="menu.icon" :class="menu.icon"></i>
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
