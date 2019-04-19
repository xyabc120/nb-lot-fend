<template>
  <div class="page">
    <div class="page-title">工单管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="filter">
          <el-form-item label>
            <el-input v-model="filter.workOrderNumber" placeholder="请输入工单编号"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.imei" placeholder="请输入设备编号imei"></el-input>
          </el-form-item>
          <el-form-item label v-if="filter.type === '0'">
            <el-input v-model="filter.dispatchUser" placeholder="处理人"></el-input>
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
            <el-button
              icon="el-icon-plus"
              @click="()=> this.$router.push({name: 'addworkorder'})"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-radio-group v-model="filter.type" size="small" @change="handleClick">
        <el-radio-button label="0">发起的工单</el-radio-button>
        <el-radio-button label="1">待办工单</el-radio-button>
      </el-radio-group>
      <div class="table">
        <el-table :data="workOrderList" border style="width: 100%">
          <el-table-column prop="workOrderNumber" label="工单编号" width="110">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.row)"
              >{{`${scope.row.workOrderNumber}`}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="workFlowName" label="流程名称"></el-table-column>
          <el-table-column prop="statusName" label="工单状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.workOrderStatus  === 5 ? 'info' : 'success' "
                :color="'#ffffff'"
                :hit="false"
                size="mini"
              >{{scope.row.statusName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="deviceList" label="关联设备">
            <template slot-scope="scope">
              <el-popover placement="right" width="300" trigger="click">
                <el-table :data="scope.row.deviceList">
                  <el-table-column width="150" property="imei" label="设备编号"></el-table-column>
                  <el-table-column width="150" property="deviceName" label="设备名称"></el-table-column>
                </el-table>
                <!-- <el-button slot="reference" type="text">{{`${scope.row.deviceList[0].imei}...`}}</el-button> -->
                <el-button slot="reference" type="text" size="mini">{{scope.row.deviceList.length}}台</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="工单地址" width="220">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" :content="scope.row.address" placement="top">
                <span>{{scope.row.address | substring(13)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="dispatchUser" label="当前处理人"></el-table-column>
          <el-table-column prop="updateDate" label="更新日期" width="160"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="160"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="findDetail(scope.$index, scope.row)">查看</el-button> -->
              <el-button size="mini" @click="handleEdit(scope.row)" plain>查看</el-button>
              <el-button
                v-if="scope.row.workOrderStatus !== 5"
                size="mini"
                type="danger"
                @click="closeWorkOrder(scope.row)"
              >关闭</el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: {
        type: "0",
        imei: "", //	设备编号
        deviceName: "", //	设备名称
        dispatchUser: "", //	经办人
        createDate: [], //	创建日期

        pageIndex: 1,
        pageSize: 10
      },
      workOrderList: [],
      total: 0
    };
  },
  mounted() {
    this.getWorkOrderList();
  },
  methods: {
    query() {
      this.getWorkOrderList();
    },
    handleClick() {
      if (this.filter.type === "1") {
        this.filter.dispatchUser = "";
      }
      this.getWorkOrderList();
    },
    getWorkOrderList() {
      let api = "/workOrder/getWellCoverWorkOrderList";
      let params = {
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.workOrderList = res.data;
          this.total = res.total;
          this.$message({
            message: "数据请求成功！",
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
    closeWorkOrder(workOrder) {
      this.$confirm("确定要关闭此工单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let api = `workOrder/closeWorkOrder/${workOrder.id}`;
          this.$fetch.post(api).then(res => {
            if (res.code === 10000) {
              this.$notify({
                title: "提示",
                message: "工单已关闭",
                type: "warning"
              });
              this.getWorkOrderList();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          console.log("您已取消了关闭操作");
        });
    },
    handleEdit(workOrder) {
      this.$router.push({
        name: "workorderdetail",
        params: { id: workOrder.id }
      });
    },
    findDetail(workOrder) {},
    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.getWorkOrderList();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getWorkOrderList();
    }
  }
};
</script>
