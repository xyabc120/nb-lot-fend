<template>
  <div class="warning">
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
        :data="warningList"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="imei" label="imei" width="180"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="warningStatus" label="告警状态">
          <template slot-scope="scope">{{scope.row.warningStatus | wallCover_toWaringStarus}}</template>
        </el-table-column>
        <el-table-column prop="warningDate" label="告警时间"></el-table-column>
        <el-table-column prop="reason" label="消除原因"></el-table-column>
        <el-table-column prop="eliminateDate" label="消除时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.warningType === 0">
            <el-button
              v-if="scope.$index === 0 || scope.$index === 2"
              @click.native.prevent="()=>{row=scope.row; dialogFormVisible = !dialogFormVisible}"
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
        :current-page="filter.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
  name: "HistoryWarning",
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
      warningList: [],
      total: 0,
      row: {},
      dialogFormVisible: false,
      reason: ""
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.getDeviceWarningById(this.id);
  },
  methods: {
    // 查询
    query: function() {
      this.getDeviceWarningById(this.id);
    },
    getDeviceWarningById(id) {
      let api = "/alarm/getWellCoverAlarmById";
      let params = {
        deviceId: id,
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.warningList = res.data;
          this.total = res.total;
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
