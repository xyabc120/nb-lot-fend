<template>
  <div>
    <div class="page-title">设备概览</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$fetch.get("api/asts/getData").then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

