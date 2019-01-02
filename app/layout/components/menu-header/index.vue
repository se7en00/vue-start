<template>
    <nav :class="{'is-scrollable': isScroll}">
        <div class="header-menu__content" ref="content">
            <div class="header-menu__scroll" ref="scroll" :style="'transform: translateX(' + currentTranslateX + 'px);'">
                <el-menu
                    class="header-menu__navMenu"
                    mode="horizontal"
                    :default-active="active"
                    ref="headerMenu"
                    @select="handleMenuSelect"
                >
                    <template v-for="(menu, menuIndex) in headerMenu">
                        <menu-item :menu="menu" :key="menuIndex"/>
                    </template>
                </el-menu>
            </div>
        </div>
        <div v-if="isScroll" class="header-menu__prev" @click="scroll('left')">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div v-if="isScroll" class="header-menu__next" @click="scroll('right')">
            <i class="el-icon-arrow-right"></i>
        </div>
    </nav>
</template>

<script>
import { headerMenu } from '@/menu/menus'
import MenuItem from '../menu-item'
import menuMixin from '../../mixin/menu'
export default {
    components: {
        'menu-item': MenuItem
    },
    mixins: [menuMixin],
    data() {
        return {
            headerMenu,
            active: '',
            isScroll: false,
            scrollWidth: 0,
            contentWidth: 0,
            currentTranslateX: 0,
            throttledCheckScroll: null
        }
    },
    watch: {
        '$route.matched': {
            handler(val) {
                this.active = val[0].path
            },
            immediate: true
        }
    },
    methods: {
        scroll(direction) {
            if (direction === 'left') {
                // 向右滚动
                this.currentTranslateX = 0
            } else {
                // 向左滚动
                if (this.contentWidth * 2 - this.currentTranslateX <= this.scrollWidth) {
                    this.currentTranslateX -= this.contentWidth
                } else {
                    this.currentTranslateX = this.contentWidth - this.scrollWidth
                }
            }
        },
        checkScroll() {
            let contentWidth = this.$refs.content.clientWidth
            let scrollWidth = this.$refs.scroll.clientWidth
            if (this.isScroll) {
                // 页面依旧允许滚动的情况，需要更新width
                if (this.contentWidth - this.scrollWidth === this.currentTranslateX) {
                    // currentTranslateX 也需要相应变化【在右端到头的情况时】
                    this.currentTranslateX = contentWidth - scrollWidth
                    // 快速的滑动依旧存在判断和计算时对应的contentWidth变成正数，所以需要限制一下
                    if (this.currentTranslateX > 0) {
                        this.currentTranslateX = 0
                    }
                }
                // 更新元素数据
                this.contentWidth = contentWidth
                this.scrollWidth = scrollWidth
                // 判断何时滚动消失: 当scroll > content
                if (contentWidth > scrollWidth) {
                    this.isScroll = false
                }
            }
            // 判断何时滚动出现: 当scroll < content
            if (!this.isScroll && contentWidth < scrollWidth) {
                this.isScroll = true
                // 注意，当isScroll变为true，对应的元素盒子大小会发生变化
                this.$nextTick(() => {
                    contentWidth = this.$refs.content.clientWidth
                    scrollWidth = this.$refs.scroll.clientWidth
                    this.contentWidth = contentWidth
                    this.scrollWidth = scrollWidth
                    this.currentTranslateX = 0
                })
            }
        }
    },
    mounted() {
        // 初始化判断
        // 默认判断父元素和子元素的大小，以确定初始情况是否显示滚动
        this.checkScroll()
        // 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
        this.throttledCheckScroll = _.throttle(this.checkScroll, 300)
        window.addEventListener('resize', this.throttledCheckScroll)
    },
    beforeDestroy() {
        // 取消监听
        window.removeEventListener('resize', this.throttledCheckScroll)
    }
}
</script>
<style lang="scss">
    .is-scrollable {
        position: relative;
        padding: 0 20px;
        .header-menu__prev, .header-menu__next {
            display: flex !important;
            align-items: center;
        }
    }
    .header-menu {

        @include e(content) {
            overflow: hidden;
            display: flex;
            flex-shrink: 1;
            flex-grow: 1;
            -webkit-box-flex: 1;
            .el-menu--horizontal {
                > .el-menu-item {
                    @extend %flex-center-row;
                    color: $header-font-color;
                    border-bottom: 0 !important;
                    i {
                        color: $header-icon-color !important;
                    }
                    .dot-circle {
                        display: none !important;
                    }
                    .title {
                        margin: 0 !important;
                        border-bottom: 2px solid;
                        border-bottom-color: transparent;
                        line-height: 58px !important;
                    }
                    &.is-active, &:not(.is-disabled):hover, &:not(.is-disabled):focus {
                        border-bottom: 0;
                        background: none;
                        color: $header-active-font-color;
                        i {
                            color: $header-active-font-color !important;
                        }
                        .title {
                            border-bottom-color: #fff;
                            transition: border-bottom-color .3s;
                            /*margin-left: 10px;*/
                        }
                    }
                }
            }
        }

        @include e(scroll) {
            flex-shrink: 0;
            flex-grow: 0;
            -webkit-box-flex: 0;
            white-space: nowrap;
            position: relative;
            transition: transform .3s;
        }

        @include e(navMenu) {
            background: none !important;
            list-style-type: none !important;
        }

        @include e(prev) {
            height: 60px;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 20px;
            cursor: pointer;
            display: none;
            border-color: #fff;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }

        @include e(next) {
            height: 60px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 20px;
            cursor: pointer;
            display: none;
            border-color: #fff;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
</style>
