<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <div class="h100 grid-content bg-purple count-number">
              <div class="el-icon-iot-zhushujuguanli icon-style color-43D3B1"></div>
              <div class="data-right">
                <p>智能井盖总量</p>
                <span>{{deviceNumber}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="h100 grid-content bg-purple count-number">
              <div class="el-icon-iot-xiaoxi icon-style color-ffbb6d"></div>
              <div class="data-right">
                <p>今日告警次数</p>
                <span>{{woring}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="h200 grid-content bg-purple">
              <doughnut-chart title="智能井盖状态" :dataSet="secondList"></doughnut-chart>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="24">
            <div class="h420 grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="h260 grid-content bg-purple">
          <div class="line-chart-header">
            <span class="line-chart-header-title">井盖设备报警量</span>
            <div class="line-chart-header-label">
              <span>时间范围</span>
              <el-select v-model="timeFrame" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="line-chart-body">
            <line-chart></line-chart>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DoughnutChart from "@/components/charts/doughnut-chart";
import LineChart from "../../../components/charts/line-chart";
export default {
  components: {
    DoughnutChart,
    LineChart
  },
  data() {
    return {
      deviceNumber: 0,
      woring: 0,
      timeFrame: 2,
      options: [
        { value: 1, label: "半年内" },
        { value: 2, label: "一个月内" },
        { value: 3, label: "一周内" }
      ],
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
.dashboard {
  // border: 1px solid red;
  height: 100%;
  width: 100%;
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .count-number {
    .color-43D3B1 {
      color: #43d3b1;
    }
    .color-ffbb6d {
      color: #ffbb6d;
    }
    width: 100%;
    height: 100px;
    background: #fff;
    border-radius: 2px;
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
  .line-chart-header {
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .line-chart-header-title {
      font-size: 14px;
      color: #929eaa;
    }
    .line-chart-header-label {
      span {
        font-size: 16px;
        color: #434e5c;
        letter-spacing: 0;
        line-height: 16px;
        margin-right: 20px;
      }
    }
  }
  .line-chart-body {
    border: 1px solid red;
    width: 100%;
    height: 200px;
  }
}
</style>
