<template>
    <section class="container-component" ref="container">
        <!-- [container-full] 填充 -->
        <container-full v-if="type === 'full'" v-bind="$attrs">
            <slot v-if="$slots.title" name="title" slot="title"/>
            <slot v-if="$slots.searchCriteria" name="searchCriteria" slot="searchCriteria"/>
            <slot v-if="$slots.search" name="search" slot="search"/>
            <slot v-if="$slots.note" name="note" slot="note"/>
            <slot/>
            <slot v-if="$slots.footer" name="footer" slot="footer"/>
        </container-full>
    </section>
</template>

<script>
import ContainerFull from './ContainerFull'
export default {
    name: 'main-container',
    inheritAttrs: false,
    components: {
        'container-full': ContainerFull
    },
    props: {
        // 容器样式
        type: {
            type: String,
            required: false,
            default: 'full'
        },
        // 滚动优化
        betterScroll: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss">
.container-component {
    display: flex;
    flex: 1;
    padding: 16px 16px 40px;
    overflow: hidden;
}
</style>
