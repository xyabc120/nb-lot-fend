<template>
  <div class="monitor">
    <div class="filter mb20">
      <span>
        <!-- 告警设备：{{imei}} -->
      </span>
      <div>
        <label>时间范围</label>
        <el-date-picker
          v-model="filter.createDate"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="query()"
        ></el-date-picker>
      </div>
    </div>
    <div class="table">
      <el-table
        v-if="!!monitorList"
        :data="monitorList"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="imei" label="imei" width="180"></el-table-column>
        <el-table-column prop="createDate" label="时间" width="180"></el-table-column>
        <el-table-column prop="battery" label="电量"></el-table-column>
        <el-table-column prop="waterLevel" label="水位"></el-table-column>
        <el-table-column prop="brightness" label="亮度"></el-table-column>
        <el-table-column prop="isTilt" label="是否倾斜"></el-table-column>
        <el-table-column prop="signalStrength" label="型号强度"></el-table-column>
        <el-table-column prop="warningStatus" label="告警状态">
          <template slot-scope="scope">{{scope.row.warningStatus | wallCover_toWaringStarus}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      filter: {
        createDate: [], //	创建日期
        pageIndex: 1,
        pageSize: 10
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      monitorList: [],
      total: 0
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.getDevicePropsById(this.id);
  },
  methods: {
    query() {
      this.getDevicePropsById(this.id);
    },
    getDevicePropsById(id) {
      let api = "/monitor/getWellCoverMonitorById";
      let params = {
        deviceId: id,
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.monitorList = res.data;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.getDeviceWarningById(this.id);
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getDeviceWarningById(this.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.monitor {
  background: #fff;
  border-radius: 4px;
  padding: 0 10px;
  .filter {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 18px;
      font-weight: 600;
      font-family: Extra large;
      line-height: 40px;
      color: #2d3e50;
    }
    label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}
</style>
