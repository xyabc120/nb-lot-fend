<template>
  <div class="page">
    <div class="page-title">用户管理</div>
    <div class="page-content">
      <div class="filter">
        <el-form :inline="true" :model="filter">
          <el-form-item label="姓名">
            <el-input v-model="filter.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="filter.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="登录名">
            <el-input v-model="filter.loginName" placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="filter.jobNumber" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
            <el-button icon="el-icon-plus" @click="editUser(0)">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column prop="jobNumber" label="工号"></el-table-column>
          <el-table-column prop="loginName" label="登录名"></el-table-column>
          <el-table-column prop="userName" label="姓名" width="170"></el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">{{scope.row.gender === '1' ? '男' : '女'}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="220"></el-table-column>
          <el-table-column prop="email" label="电子邮箱" width="180"></el-table-column>
          <el-table-column prop="userType" label="用户类型" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.userType === '0'">超级管理员</span>
              <span v-if="scope.row.userType === '1'">管理员</span>
              <span v-if="scope.row.userType === '2'">员工</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="160">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status  === '0' ? 'success' : 'info' "
                :color="'#ffffff'"
                :hit="false"
                :size="'mini'"
              >{{scope.row.status === '0' ? '启用' : '禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.status === '0'"
                @click="enable(scope.$index, scope.row)"
              >停用</el-button>
              <el-button
                size="mini"
                type="text"
                v-else-if="scope.row.status === '1'"
                @click="enable(scope.$index, scope.row)"
              >启用</el-button>
              <el-button size="mini" type="text" @click="editUser(scope.row.id)">修改</el-button>
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
        userName: "",
        jobNumber: "",
        phone: "",
        loginName: "",
        pageIndex: 1,
        pageSize: 10
      },
      userList: [],
      total: 0
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 查询
    query: function() {
      this.getUserList();
    },
    // 获取用户列表
    getUserList: function() {
      let api = "/user/getUserList ";
      let params = {
        ...this.filter
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.userList = res.data;
          this.total = res.total;
        }
      });
    },
    // 启用禁用
    enable(index, user) {
      let api = "/user/enable ";
      let params = {
        id: user.id,
        status: user.status === "1" ? "0" : "1"
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          // 更新行数据
          this.userList[index].status = user.status === "1" ? "0" : "1";
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
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getUserList();
    },
    editUser(id) {
      this.$router.push({
        name: "useredit",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
