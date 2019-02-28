<template>
  <div class="dashboard-wrap">
    <div class="dashboard-header">
      <div class="leftside">
        <div class="count-number"><i class="el-icon-iot-Numberlist"></i></div>
        <div class="count-number"></div>
        <div class="count-report"></div>
      </div>
      <div class="rightside"></div>
    </div>
    <div class="dashboard-footer"></div>
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
.dashboard-wrap {
  background-color: #f5f5f5;

  .dashboard-header {
    display: flex;
    margin-bottom: 20px;
    .leftside {
      flex-grow: 1;
      margin-right: 20px;
      box-sizing: content-box;

      .count-number {
        width: 100%;
        height: 150px;
        background: #fff;
        border-radius: 2px;
        margin-bottom: 20px;
      }

      .count-report {
        width: 100%;
        height: 300px;
        background: #fff;
        border-radius: 2px;
      }
    }

    .rightside {
      flex-grow: 2;
      background: #fff;
      height: 640px;
    }
  }
  .dashboard-footer {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
