<template>
    <article class="container-full">
        <header v-if="$slots.title"
                class="container-full__title"
                :class="{'container-full__title--withBorder': $attrs.whiteBg}"
                ref="title">
            <slot name="title"/>
        </header>
        <div v-if="$slots.searchCriteria" class="container-full__searchCriteria" ref="searchCriteria">
            <slot name="searchCriteria"/>
        </div>
        <div v-if="$slots.search" class="container-full__search" ref="search">
            <slot name="search"/>
        </div>
        <div class="container-full__body" :class="{'container-full__body--white': $attrs.whiteBg}">
            <slot/>
        </div>
        <footer v-if="$slots.footer" class="container-full__footer" ref="footer">
            <slot name="footer"/>
        </footer>
    </article>
</template>

<script>
export default {
    name: 'main-container-full'
}
</script>

<style lang="scss" scoped>
    .container-full {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;

        @include e(title) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            flex: 0 0 70px;
            min-height: 70px;
            font-size: $main-container-header-title-size;
            font-weight: 600;
            color: $main-container-header-title-color;
            background: #fff;
            padding: 10px 30px 15px;
            box-shadow: 13px 32px 36px -14px hsla(0, 0%, 70%, 0.10);

            label {
                text-shadow: 1px 1px 2px $light-grey;
            }
            /*padding: 15px 20px;*/
            @include m(withBorder) {
                border-bottom: 1px solid $border-color-base;
            }

            .actions {
                display: inline-flex;
            }
        }

        @include e(searchCriteria) {
            display: flex;
            min-height: 30px;
            padding: 0 30px 10px;
            font-size: 12px;
            line-height: 2;
            background-color: #fff;
        }

        @include e(search) {
            padding: 15px 20px;
        }

        @include e(body) {
            flex-grow: 1;
            padding: 0 30px;
            overflow: auto;
            position: relative;
            padding-top: 10px;
            height: calc(100% - 150px);
            @include m(white) {
                background-color: #fff;
                padding-top: 50px !important;
            }
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 60px;
                font-size: 16px;
                //color: $main-container-header-title-color;
                margin: -20px -20px 15px -20px;
                padding: 0 15px;
                //border-bottom: 1px solid $main-container-header-border-bottom-color;
                letter-spacing:0;
                font-weight: bold;
                text-align:left;
            }
        }

        @include e(footer) {
            display: flex;
            flex: 0 0 60px;
            min-height: 60px;
            justify-content: center;
            padding: 12px 20px;
            background-color:$main-container-bg;
        }
    }
</style>
