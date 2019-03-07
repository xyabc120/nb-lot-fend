<template>
  <div class="dashboard-wrap">
    <div class="dashboard-header">
      <div class="leftside">
        <div class="count-number">
          <div class="el-icon-iot-zhushujuguanli icon-style color-43D3B1"></div>
          <div class="data-right">
            <p>智能井盖总量</p>
            <span>{{deviceNumber}}</span>
          </div>
        </div>
        <div class="count-number">
          <div class="el-icon-iot-xiaoxi icon-style color-ffbb6d"></div>
          <div class="data-right">
            <p>今日告警次数</p>
            <span>{{woring}}</span>
          </div>
        </div>
        <div class="count-report">
          <div class="doughnut-wrapper">
            <doughnut-chart chartId="c02" title="智能井盖状态" :dataSet="secondList"></doughnut-chart>
          </div>
        </div>
      </div>
      <div class="rightside"></div>
    </div>
    <div class="dashboard-footer"></div>
  </div>
</template>

<script>
import doughnutChart from "../../../components/charts/doughnutChart";
export default {
  components: {
    doughnutChart
  },
  data() {
    return {
      deviceNumber: 0,
      woring: 0,
      secondList: [
        {
          value: 20,
          name: "正常"
        },
        {
          value: 32,
          name: "低电量"
        },
        {
          value: 48,
          name: "离线"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      setInterval(() => {
        this.deviceNumber = this.deviceNumber + 51;
        this.woring = this.woring + 1;
        if (this.deviceNumber > 1024) {
          this.deviceNumber = 1024;
          this.woring = 36;
          clearInterval();
        }
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-43D3B1 {
  color: #43d3b1;
}
.color-ffbb6d {
  color: #ffbb6d;
}
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
        height: 100px;
        background: #fff;
        border-radius: 2px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
        .icon-style {
          font-size: 64px;
          position: relative;
          top: 50%;
          left: 20px;
          margin-top: -32px;
        }
        .data-right {
          text-align: right;
          letter-spacing: 0;
          p {
            padding: 20px;
            font-size: 14px;
            color: #929eaa;
          }
          span {
            padding: 0 20px 20px 0;
            font-size: 32px;
            color: #576573;
          }
        }
      }

      .count-report {
        width: 100%;
        height: 200px;
        background: #fff;
        border-radius: 2px;
        .doughnut-wrapper {
          height: 100%;
          width: 100%;
        }
      }
    }

    .rightside {
      flex-grow: 2;
      background: #fff;
      height: 440px;
    }
  }
  .dashboard-footer {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
