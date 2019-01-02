<template>
    <header class="header">
        <header class="header__logo" :class="{'header__logo--collapse': asideCollapse}">
            <div class="logo__title">
                <span v-if="!asideCollapse">商家中心</span>
            </div>
        </header>
        <div class="header__hamburger" :class="{'header__hamburger--vertical': asideCollapse}" @click="handleToggleAside">
            <i class="fas fa-bars" style="font-size: 20px"></i>
        </div>
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
        height: 60px;
        position: relative;
        box-sizing: content-box;
        background: linear-gradient(to right, $primary-color, $header-bg);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=#{$primary-color},endColorStr=#{$header-bg},gradientType=0);
        color: $header-font-color;
        z-index: 99;
        box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
        /*background: url('./header-bg.png') no-repeat center center;*/

        @include e(logo) {
            @extend %flex-center-row;
            border-bottom: 0;
            flex-shrink: 0;
            width: 200px;
            min-width: 200px;
            transition: all .3s;
            @include m(collapse) {
                width: 65px;
                min-width: 65px;
            }
        }

        @include e(hamburger) {
            @extend %unable-select;
            @extend %flex-center-row;
            flex: 0 0 60px;
            i {
                transition: all 0.3s ease 0.1s;
            }
            @include m(vertical) {
                i {
                    transform:rotate(-90deg);
                }
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

    .logo {
        @include e(title) {
            display: inline-flex;
            position: relative;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            padding: 0 20px;
            font-size: 20px;
            font-weight: 600;
            color: #fff;
        }
    }
</style>
