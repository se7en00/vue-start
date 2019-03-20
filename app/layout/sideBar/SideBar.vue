<template>
    <aside class="sideBar" :class="{'sideBar--collapse': asideCollapse}">
        <div class="sideBar__merchant">
            <h3 class="merchant-name">
                {{merchantName}}
            </h3>
        </div>
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
        <div class="sideBar__icon" :class="{'sideBar__icon--collapse': asideCollapse}">
            <i class="fas fa-outdent" @click.stop="handleToggleAside"></i>
        </div>
    </aside>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
        ...mapGetters(['merchantName']),
        ...mapState({
            asideCollapse: state => state.menu.asideCollapse,
            asides: state => state.menu.asideMenus
        })
    },
    methods: {
        ...mapActions(['asideCollapseToggle']),
        /**
         * 接收点击切换侧边栏的按钮
         */
        handleToggleAside() {
            this.asideCollapseToggle()
        }
    }
}
</script>

<style scoped lang="scss">
    .sideBar{
        position: relative;
        height: 100%;
        width: 190px;// [侧边栏宽度] 正常状态
        background: $sidebar-bg;
        transition: width .3s;
        overflow: hidden;
        flex-shrink: 0;
        @include m(collapse) {
            width: 65px;// [侧边栏宽度] 折叠状态
        }

        @include e(merchant) {
            padding: 20px 16px 15px;
            cursor: auto;
            > .merchant-name {
                position: relative;
                padding-bottom: 5px;
                border-bottom: 1px solid $base-border-color;
                i {
                    @extend %unable-select;
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
            }
        }

        @include e(icon) {
            text-align: right;
            padding-right: 10px;
            position: absolute;
            right: 0;
            width: 100%;
            bottom: 24px;
            cursor: pointer;
            transition: all .3s;
            @include m(collapse) {
                text-align: center;
            }
            /*cursor: w-resize;*/
        }

        //重写element ui 样式
        /deep/ .el-menu {
            border-right: 0;
            background-color: transparent;
            &-item {
                color: $sidebar-font-color;
                font-weight: 400;
                height: 42px !important;
                line-height: 42px !important;
                padding-left: 20px !important;
                i {
                    color: $sidebar-icon-color;
                    width: 20px;
                }
                .title {
                    margin-left: 25px;
                }
                &:focus, &:hover, &.is-active {
                    transition: 0.3s all ease-in;
                    background-color: $sidebar-hover-bg;
                    .dot-circle {
                        background-color: $sidebar-hover-icon-color;
                    }
                }
                &.is-active {
                    background-color: $sidebar-active-bg !important;
                    span {
                        color: $sidebar-hover-font-color !important;
                    }
                    i {
                        color: $sidebar-hover-icon-color!important;
                        width: 20px;
                    }
                }
            }
        }

        //重写element 二级菜单 样式
        /deep/ .el-submenu__title {
            color: $sidebar-font-color;
            background-color: $white-bg;
            height: 42px !important;
            line-height: 42px !important;
            i {
                color: $sidebar-icon-color;
                width: 20px;
            }
        }
    }
</style>
