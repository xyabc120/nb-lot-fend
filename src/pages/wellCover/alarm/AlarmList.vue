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
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :format="'yyyy-MM-dd'"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="warningList" border style="width: 100%">
          <el-table-column prop="imei" label="imei" width="170"></el-table-column>
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="warningStatus" label="告警状态">
            <template slot-scope="scope">{{scope.row.warningStatus| wallCover_toWaringStarus}}</template>
          </el-table-column>
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
          <el-table-column label="操作" width="160">
            <template slot-scope="scope" v-if="scope.row.warningType === 0">
              <el-button
                @click.native.prevent="()=>{row=scope.row; dialogFormVisible = !dialogFormVisible}"
                type="warning"
                plain
                size="mini"
              >消除</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                plain
                size="mini"
              >转工单</el-button>
            </template>
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
    <el-dialog title="告警消除" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="消除原因:" label-width="80px">
          <el-input
            type="textarea"
            v-model="reason"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入消除原因"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="eliminateDeviceWarningById()">确 定</el-button>
      </div>
    </el-dialog>
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
        createDate: [] //	创建日期
      },
      warningList: [],
      total: 0,
      row: {},
      dialogFormVisible: false,
      reason: ""
    };
  },
  mounted() {
    this.getDeviceWarningById();
  },
  methods: {
    query() {
      this.getDeviceWarningById();
    },
    getDeviceWarningById() {
      let api = "alarm/getWellCoverAlarmList";
      let params = {
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.warningList = res.data;
          this.total = res.total;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },

    // 消除告警
    eliminateDeviceWarningById() {
      let api = "/alarm/eliminateWellCoverAlarmById";
      let params = {
        id: this.row.id,
        reason: this.reason
      };
      this.dialogFormVisible = !this.dialogFormVisible;
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.$message({
            message: "消除成功！",
            type: "success"
          });
          this.getDeviceWarningById(this.id);
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.getDeviceWarningById();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getDeviceWarningById();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

