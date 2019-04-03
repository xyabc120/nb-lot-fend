<template>
  <div class="page">
    <div class="page-title">设备管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备编号">
            <el-input v-model="formInline.user" placeholder="请输入设备编号"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formInline.user" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formInline.user" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop label="设备编号"></el-table-column>
          <el-table-column prop label="设备名称"></el-table-column>
          <el-table-column prop label="地址" width="260"></el-table-column>
          <el-table-column prop label="设备状态"></el-table-column>
          <el-table-column prop label="接入运营商"></el-table-column>
          <el-table-column prop label="创建日期"></el-table-column>
          <el-table-column prop label="最后在线时间"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="100"
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      formInline: {
        user: "",
        region: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
}
</style>

