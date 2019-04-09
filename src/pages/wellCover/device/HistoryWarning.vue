<template>
  <div class="warning">
    <div class="filter mb20">
      <span>告警设备：{{imei}}</span>
      <div class>
        <label>时间范围</label>
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
    <div class="table">
      <el-table
        :data="warningList"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="imei" label="imei" width="180"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="warningType" label="告警类型"></el-table-column>
        <el-table-column prop="warningStatus" label="告警状态"></el-table-column>
        <el-table-column prop="warningDate" label="告警时间"></el-table-column>
        <el-table-column prop="reason" label="消除原因"></el-table-column>
        <el-table-column prop="eliminateDate" label="消除时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index === 0 || scope.$index === 2"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="mini"
            >消除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "HistoryWarning",
  data() {
    return {
      imei: this.$route.params.id,
      timeFrame: 2,
      options: [
        { value: 1, label: "半年内" },
        { value: 2, label: "一个月内" },
        { value: 3, label: "一周内" }
      ],
      warningList: [
        {
          id: "1221", // 	id
          imei: this.$route.params.id, // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "", // 	消除原因
          eliminateDate: "" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: this.$route.params.id, // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: this.$route.params.id, // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "", // 	消除原因
          eliminateDate: "" // 	消除时间
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.warning {
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
