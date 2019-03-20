<template>
    <header class="header">
        <header class="header__logo" :class="{'header__logo--collapse': asideCollapse}">
            <img style="margin-left: 10px" height="26" src="./Group.png" >
        </header>
        <span class="header__title" :class="{'header__title--collapse': asideCollapse}">测试中心</span>
        <!-- header menu -->
        <menu-header class="header__menu"/>

        <div class="header__right-menu">
            <el-tooltip content="全屏" effect="dark" placement="bottom" v-if="!isIE">
                <screen-full class="right-menu__item"/>
            </el-tooltip>

            <header-user/>
        </div>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeaderUser from '../components/header-user'
import MenuHeader from '../components/menu-header'

export default {
    name: 'Header',
    components: {
        'header-user': HeaderUser,
        'menu-header': MenuHeader
    },
    computed: {
        ...mapState({
            asideCollapse: state => state.menu.asideCollapse
        }),
        isIE() {
            return ~navigator.userAgent.indexOf('Trident')
        }
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
    .header {
        display: flex;
        height: 45px;
        position: relative;
        box-sizing: content-box;
        background: $header-bg;
        color: $header-font-color;
        z-index: 99;
        /*box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);*/
        /*background: url('./header-bg.png') no-repeat center center;*/

        /deep/ .el-menu--horizontal > .el-menu-item {
            height: 45px !important;
        }
        @include e(logo) {
            @extend %flex-center-row;
            padding: 0 10px;
            justify-content: flex-start;
            border-bottom: 0;
            flex-shrink: 0;
            width: 190px;
            min-width: 190px;
            transition: all .3s;
            @include m(collapse) {
                width: 65px;
                min-width: 60px;
            }
        }

        @include e(title) {
            position: absolute;
            color: #fff;
            height: 100%;
            display: flex;
            align-items: center;
            left: 60px;
            opacity: 1;
            transition: 1s all ease-in;
            @include m(collapse) {
                display: none;
            }
        }

        @include e(menu){
            flex: 1;
        }

        @include e(right-menu) {
            display: flex;
            height: 100%;
            align-items: center;
            flex-grow: 0;
            flex-shrink: 0;
            .logout-link {
                margin-right: 20px;
            }
        }
    }
</style>
