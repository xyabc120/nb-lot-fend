<template>
  <div class="monitor">
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
        :data="monitorList"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="createDate" label="时间" width="180"></el-table-column>
        <el-table-column prop="battery" label="电量"></el-table-column>
        <el-table-column prop="waterLevel" label="水位"></el-table-column>
        <el-table-column prop="brightness" label="亮度"></el-table-column>
        <el-table-column prop="isTilt" label="是否倾斜"></el-table-column>
        <el-table-column prop="signalStrength" label="型号强度"></el-table-column>
        <el-table-column prop="warningStatus" label="告警状态"></el-table-column>
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
  name: "",
  data() {
    return {
      imei: this.$route.params.id,
      timeFrame: 2,
      options: [
        { value: 1, label: "半年内" },
        { value: 2, label: "一个月内" },
        { value: 3, label: "一周内" }
      ],
      monitorList: [
        {
          createDate: "2019-04-08", // 	时间
          battery: "3.7V", // 	电量
          waterLevel: "2000 MM", // 	水位
          brightness: "500 cd/m2", // 	亮度
          isTilt: "否", // 	是否倾斜
          signalStrength: "正常", // 	信号强度
          warningStatus: "水位高" // 	告警状态	(2：信号弱，3：倾斜大，4:水位高，5:亮度高，6.电量低，)
        },
        {
          createDate: "2019-04-08", // 	时间
          battery: "3.7V", // 	电量
          waterLevel: "2000 MM", // 	水位
          brightness: "500 cd/m2", // 	亮度
          isTilt: "否", // 	是否倾斜
          signalStrength: "正常", // 	信号强度
          warningStatus: "水位高" // 	告警状态	(2：信号弱，3：倾斜大，4:水位高，5:亮度高，6.电量低，)
        },
        {
          createDate: "2019-04-08", // 	时间
          battery: "3.7V", // 	电量
          waterLevel: "2000 MM", // 	水位
          brightness: "500 cd/m2", // 	亮度
          isTilt: "否", // 	是否倾斜
          signalStrength: "正常", // 	信号强度
          warningStatus: "水位高" // 	告警状态	(2：信号弱，3：倾斜大，4:水位高，5:亮度高，6.电量低，)
        }
      ]
    };
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
