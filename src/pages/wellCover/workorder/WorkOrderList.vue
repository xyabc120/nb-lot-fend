<template>
  <div class="page">
    <div class="page-title">工单管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="filter">
          <el-form-item label>
            <el-input v-model="filter.imei" placeholder="请输工单备编号"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.deviceName" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="filter.address" placeholder="经办人"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
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
            <el-button icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="workOrderList" border style="width: 100%">
          <el-table-column prop="workOrderNumber" label="工单编号" width="170"></el-table-column>
          <el-table-column prop="workFlow" label="流程名称"></el-table-column>
          <el-table-column prop="workOrderStatus" label="工单状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.workOrderStatus  === '结束' ? 'success' : 'info' "
                :color="'#ffffff'"
                :hit="false"
                :size="'mini'"
              >{{scope.row.workOrderStatus}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="imei" label="关联设备"></el-table-column>
          <el-table-column prop="address" label="工单地址" width="220"></el-table-column>
          <el-table-column prop="dispatchUser" label="经办人"></el-table-column>
          <el-table-column prop="updateDate" label="更新日期" width="160"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="160"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="findDetail(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination mt20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="filter.currentPage"
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
        dispatchUser: "", //	经办人
        createDate: "", //	创建日期

        currentPage: 1
      },
      workOrderList: [
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "进行中", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "结束", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "结束", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "进行中", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "结束", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "结束", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "结束", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        },
        {
          id: "2122", // 	id	唯一标识
          workOrderNumber: "WO2019040800000001", // 	工单编号
          workFlow: "设备维护", // 	流程名称	关联流程表
          workOrderStatus: "开始", // 	工单状态
          isDevice: "是", // 	是否关联设备
          imei: "823969794871982874", // 	设备编号
          deviceName: "测试设备", // 	设备名称
          address: "上海市浦东新区张江科技园	", // 	地址
          dispatchUser: "肖维", // 	经办人
          remark: "设备溢水维护", // 	描述
          createUser: "蔡总", // 	创建人
          updateDate: "2019-04-08 13:26:52", // 	跟新日期
          createDate: "2019-04-08 21:34:12" // 	创建日期
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
