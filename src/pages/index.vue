<template>
  <div class="container">
    <qt-header></qt-header>
    <qt-main></qt-main>
  </div>
</template>

<script>
import QtHeader from "../components/layout/Header";
import QtMain from "../components/layout/Main";
export default {
  name: "Main",
  components: {
    QtHeader,
    QtMain
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
