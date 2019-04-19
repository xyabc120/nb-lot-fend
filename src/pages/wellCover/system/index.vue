<template>
  <div class="page">
    <div class="page-title">系统设置</div>
    <div class="page-content">
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="基本设置" name="first"></el-tab-pane>
        <el-tab-pane label="告警设置" name="second" :lazy="true"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "first"
    };
  },
  mounted() {},
  methods: {}
};
</script>
