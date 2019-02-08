<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app {
    height: 100%;
    overflow: hidden;
    background: #F5F5F5;
}
@import "./style/style";
</style>
