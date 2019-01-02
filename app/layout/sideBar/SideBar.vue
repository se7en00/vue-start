<template>
    <aside class="sideBar" :class="{'sideBar--collapse': asideCollapse}">
        <el-menu
            class="sidebar__nav-menu"
            :collapse="asideCollapse"
            :unique-opened="true"
            :default-active="active"
            ref="asideMenu"
            @select="handleMenuSelect">
            <template v-for="(menu, menuIndex) in asides">
                <menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
                <menu-sub-item v-else :menu="menu" :key="menuIndex"/>
            </template>
        </el-menu>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import MenuItem from '../components/menu-item'
import MenuSubItem from '../components/menu-sub'
import menuMixin from '../mixin/menu'
export default {
    name: 'side-bar',
    mixins: [
        menuMixin
    ],
    components: {
        'menu-item': MenuItem,
        'menu-sub-item': MenuSubItem
    },
    data() {
        return {
            active: '',
            asideHeight: 300,
            BS: null
        }
    },
    watch: {
        '$route.matched': {
            handler(val) {
                if (val.length > 2) {
                    this.active = val[val.length - 2].path
                } else {
                    this.active = val[val.length - 1].path
                }
                this.$nextTick(() => {
                    if (this.asides.length > 0) {
                        this.$refs.asideMenu.activeIndex = this.active
                    }
                })
            },
            immediate: true
        }
    },
    computed: {
        ...mapState({
            asideCollapse: state => state.menu.asideCollapse,
            asides: state => state.menu.asideMenu
        })
    }
}
</script>

<style scoped lang="scss">
    .sideBar{
        height: 100%;
        width: 200px;// [侧边栏宽度] 正常状态
        background: linear-gradient(to bottom, #545eff, #596eff, #617dff, #6b8bff, #7899ff);
        transition: width .3s;
        overflow: hidden;
        flex-shrink: 0;
        @include m(collapse) {
            width: 65px;// [侧边栏宽度] 折叠状态
        }

        //重写element ui 样式
        /deep/ .el-menu {
            border-right: 0;
            background-color: transparent;
            &-item {
                color: $sidebar-font-color;
                font-weight: 700;
                i {
                    color: $sidebar-icon-color;
                }
                &:focus, &:hover, &.is-active {
                    transition: 0.3s all ease-in;
                    background-color: $sidebar-hover-bg;
                    span {
                        color: $sidebar-hover-font-color;
                    }
                    i {
                        color: $sidebar-hover-icon-color !important;
                    }
                    .dot-circle {
                        background-color: $sidebar-hover-icon-color;
                    }
                }
            }
            @include m(inline) {
                background-color: $sidebar-subItem-bg;
                > li:first-of-type {
                    box-shadow:0 4px 6px rgba(0,0,0, 0.14) inset, 0 5px 8px -3px rgba(0,0,0, 0.28) inset;
                }
                > li:last-of-type {
                    box-shadow: 0 -4px 8px -4px rgba(0, 0, 0, 0.2) inset
                }
            }
        }

        //重写element 二级菜单 样式
        /deep/ .el-submenu__title {
            color: $sidebar-font-color;
            i {
                color: $sidebar-icon-color;
            }
            &:hover {
                background-color: transparent;
                transition: 0.3s all ease-in;
                span {
                    color: $sidebar-hover-font-color;
                }
                i {
                    color: $sidebar-hover-icon-color;
                }
            }
        }
    }
</style>
