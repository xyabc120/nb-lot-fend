<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}
@import "./style/style";
</style>
