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
      let api = "/position/gisList";
      let params = {};
      this.$fetch.post(api).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

