<template>
  <div class="pageinfo">
    <div class="pageinfo-header">
      <div class="pageinfo-title">设备信息</div>
      <el-tabs v-model="active" type="card" @tab-click="handleClick">
        <el-tab-pane label="设备信息" name="first"></el-tab-pane>
        <el-tab-pane label="告警信息" name="second" :lazy="true"></el-tab-pane>
        <el-tab-pane label="监控信息" name="third" :lazy="true"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="pageinfo-content">
      <device :id="this.id" v-if="active === 'first'"></device>
      <history-warning :id="this.id" v-else-if="active === 'second'"></history-warning>
      <history-monitor :id="this.id" v-else-if="active === 'third'"></history-monitor>
    </div>
  </div>
</template>
<script>
import Device from "./Device";
import HistoryWarning from "./HistoryWarning";
import HistoryMonitor from "./HistoryMonitor";
export default {
  name: "DeviceInfo",
  components: {
    Device,
    HistoryWarning,
    HistoryMonitor
  },
  data() {
    return {
      active: "first",
      id: this.$route.params.id
    };
  },
  methods: {
    handleClick: function() {}
  }
};
</script>
<style lang="scss" scoped>
</style>

