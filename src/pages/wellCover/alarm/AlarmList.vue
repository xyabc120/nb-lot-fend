<template>
  <div class="page">
    <div class="page-title">设备告警</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="设备编号">
            <el-input v-model="filter.imei" placeholder="请输入设备编号"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="filter.deviceName" placeholder="请输入设备名称"></el-input>
          </el-form-item>

          <el-form-item label="告警状态">
            <el-select v-model="filter.warningStatus" clearable placeholder="告警状态">
              <el-option label="离线" value="1"></el-option>
              <el-option label="倾斜" value="2"></el-option>
              <el-option label="亏电" value="3"></el-option>
              <el-option label="信号弱" value="4"></el-option>
              <el-option label="溢水" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="告警日期">
            <el-date-picker
              clearable
              v-model="filter.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :format="'yyyy-MM-dd'"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="warningList" border style="width: 100%">
          <el-table-column prop="imei" label="imei" width="170"></el-table-column>
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="warningType" label="告警类型"></el-table-column>
          <el-table-column prop="warningStatus" label="告警状态"></el-table-column>
          <el-table-column prop="warningDate" label="告警时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.warningDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="消除原因"></el-table-column>
          <el-table-column prop="eliminateDate" label="消除时间">
            <template slot-scope="scope" v-if="scope.row.eliminateDate">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.eliminateDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.$index === 0 || scope.$index === 2"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="warning"
                plain
                size="mini"
              >消除</el-button>
              <el-button
                v-else
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                plain
                size="mini"
              >查看</el-button>
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
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: {
        imei: "", //	设备编号
        deviceName: "", //	设备名称
        address: "", //	地址
        warningStatus: "", //告警状态
        createDate: "" //	创建日期
      },
      warningList: [
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "", // 	消除原因
          eliminateDate: "" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "", // 	消除原因
          eliminateDate: "" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        },
        {
          id: "1221", // 	id
          imei: "823969794871982874", // 	imei
          deviceName: "测试井盖", // 	设备名称
          warningType: "倾斜", // 	告警类型
          warningStatus: "倾斜", // 	告警状态
          warningDate: "2019-04-04 21:37:27", // 	告警时间
          reason: "系统消除", // 	消除原因
          eliminateDate: "2019-04-04 21:37:27" // 	消除时间
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style lang="scss" scoped>
</style>

