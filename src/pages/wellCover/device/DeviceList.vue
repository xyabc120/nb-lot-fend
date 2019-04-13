<template>
  <div class="page">
    <div class="page-title">设备管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="filter.imei" placeholder="请输入设备编号" clearable></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.deviceName" placeholder="请输入设备名称" clearable></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.address" placeholder="请输入地址" clearable></el-input>
          </el-form-item>
          <el-form-item label>
            <el-select v-model="filter.warningStatus" clearable placeholder="告警状态">
              <el-option label="离线" value="1"></el-option>
              <el-option label="倾斜" value="2"></el-option>
              <el-option label="亏电" value="3"></el-option>
              <el-option label="信号弱" value="4"></el-option>
              <el-option label="溢水" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
              value-format="yyyy-MM-dd"
              clearable
              v-model="filter.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              :format="'yyyy-MM-dd'"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
            <el-button icon="el-icon-plus" @click="addDevice">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
        <el-table :data="deviceList" border style="width: 100%">
          <el-table-column prop="imei" label="设备编号(imei)" width="150"></el-table-column>
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="address" label="地址" width="220">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" :content="scope.row.address" placement="top">
                <span>{{scope.row.address | substring(13)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="deviceStatus" label="设备状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.deviceStatus ? 'info' : 'danger'"
                :color="'#ffffff'"
                :hit="false"
                :size="'mini'"
              >{{scope.row.deviceStatus | toDeviceStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="warningStatus" label="告警状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.warningStatus === 0 ? 'primary' : 'warning'"
                disable-transitions
                :size="'small'"
              >{{scope.row.warningStatus | wallCover_toWaringStarus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="platform" label="接入运营商" width="100">
            <template slot-scope="scope">{{scope.row.platform | formatPlatform}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.createTime.substring(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lastConnetTime" label="最后在线时间" width="190">
            <template slot-scope="scope" v-if="scope.row.lastConnetTime">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.lastConnetTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" @click="findDetail(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="()=>{dialogVisible = true; row = scope.row}"
              >删除</el-button>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>确定要删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDetelet()">确 定</el-button>
      </span>
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
        createDate: [], //	创建日期
        pageIndex: 1,
        pageSize: 10
      },
      deviceList: [],
      total: 0,
      row: {},
      dialogVisible: false
    };
  },
  mounted() {
    this.getDeviceList();
  },
  methods: {
    // 查询
    query: function() {
      this.getDeviceList();
    },
    getDeviceList() {
      let api = "/wellCoverDevice/getDeviceList";
      let params = {
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.deviceList = res.data;
          this.total = res.total;
          this.$message({
            message: "请求成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    // 删除
    confirmDetelet: function() {
      this.dialogVisible = !this.dialogVisible;
      let api = `/wellCoverDevice/deleteDeviceById/${this.row.id}`;
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.$message({
            message: "请求成功！",
            type: "success"
          });
          this.getDeviceList();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    // 查看详情
    findDetail: function(i, obj) {
      this.$router.push({
        name: "deviceinfo",
        params: {
          id: obj.id
        }
      });
    },
    addDevice() {
      this.$router.push({
        name: "deviceedit",
        params: {
          id: 0
        }
      });
    },
    handleEdit(i, obj) {
      this.$router.push({
        name: "deviceedit",
        params: {
          id: obj.imei
        }
      });
    },

    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.getDeviceList();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getDeviceList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
