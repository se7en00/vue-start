<template>
    <div id="app">
        <!-- 顶栏 -->
        <router-view name="header"/>

        <main class="main-wrapper">
            <!-- 侧边栏 -->
            <router-view name="sideBar"/>
            <!-- 主体 -->
            <router-view/>
        </main>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
    #app {
        display: flex;
        flex-flow: column nowrap;
        .main-wrapper {
            display: flex;
            flex-flow: row nowrap;
            height: inherit;
            flex: 1 2;
        }
    }
</style>
