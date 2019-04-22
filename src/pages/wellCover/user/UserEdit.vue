<template>
  <div class="page">
    <div class="page-title">用户编辑</div>
    <div class="page-content">
      <el-form :model="user" :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="user.gender">
            <el-radio :label="'1'">男</el-radio>
            <el-radio :label="'0'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="jobNumber">
          <el-input v-model="user.jobNumber"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="user.loginName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="user.email" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="user.userType" placeholder="请选择用户类型">
            <el-option label="管理员" :value="1"></el-option>
            <el-option label="员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-switch
            v-model="user.status"
            active-text="启用"
            :active-value="0"
            inactive-text="停用"
            :inactive-value="1"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveUser('ruleForm')"
            v-loading.fullscreen.lock="fullscreenLoading"
          >保存</el-button>
          <el-button @click="() => this.$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      disabled: false,
      user: {
        id: this.$route.params.id, //	id
        userName: "", //	姓名
        loginName: "", //	登录名
        jobNumber: "", //	工号
        gender: "1", //	性别
        phone: "", //	手机号
        email: "", //	电子邮箱
        userType: 2, //	用户类型
        status: 0 //	状态
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "姓名长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        jobNumber: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { max: 20, message: "工号长度在 1 到 20 个字符", trigger: "blur" }
        ],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "登录名长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号长度必须为11 个字符",
            trigger: "blur"
          },
          {
            pattern: /^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/,
            message: "手机号格式不正确"
          }
        ],
        email: [
          {
            pattern: /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/,
            message: "电子邮箱格式不正确"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.user.id != "0") {
        this.disabled = true;
        this.getUserByid(this.user.id);
      } else {
        this.user.id = "";
      }
    },
    getUserByid(id) {
      let api = `/user/getUserById/${id}`;
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.user = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    saveUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          this.$notify({
            title: "提示",
            message: "表单验证失败！",
            type: "error"
          });
          return false;
        }
      });
    },
    submit() {
      let api = "/user/saveUser ";
      let params = {
        ...this.user
      };
      this.fullscreenLoading = true;
      this.$fetch.post(api, params).then(res => {
        this.fullscreenLoading = false;
        if (res.code === 10000) {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.$router.back();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
