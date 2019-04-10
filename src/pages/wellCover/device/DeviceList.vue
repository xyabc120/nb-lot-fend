<template>
  <div class="page">
    <div class="page-title">设备管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="filter.imei" placeholder="请输入设备编号"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.deviceName" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.address" placeholder="请输入地址"></el-input>
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
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-plus" @click="addDevice">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="imei" label="设备编号" width="170"></el-table-column>
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="deviceStatus" label="设备状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.deviceStatus  === '在线' ? 'info' : 'danger'"
                :color="'#ffffff'"
                :hit="false"
                :size="'mini'"
              >{{scope.row.deviceStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="warningStatus" label="告警状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.warningStatus === '正常' ? 'primary' : 'warning'"
                disable-transitions
                :size="'small'"
              >{{scope.row.warningStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="platform" label="接入运营商" width="100"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="100"></el-table-column>
          <el-table-column prop="lastConnetTime" label="最后在线时间" width="190">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.lastConnetTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" @click="findDetail(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
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
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "离线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "倾斜",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "弱信号",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "亏电",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "离线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        },
        {
          imei: "823969794871982874",
          deviceName: "测试设备",
          address: "上海市浦东新区张江科技园",
          deviceStatus: "在线",
          warningStatus: "正常",
          platform: "电信",
          createDate: "2019-04-03  ",
          lastConnetTime: "2019-04-03 18:32:22"
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    // 查看详情
    findDetail: function(i, obj) {
      this.$router.push({
        name: "deviceinfo",
        params: {
          id: obj.imei
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

    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
}
</style>
