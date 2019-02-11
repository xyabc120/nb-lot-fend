<template>
  <div class="user-login">
    <div class="formContainer">
      <h4 class="formTitle">登 录</h4>
      <el-form :model="loginForm" class="formItems">
        <el-form-item class="next-row formItem">
          <span class="next-col formItemCol">
            <el-input
              name="username"
              prefix-icon="iconfont-user"
              v-model="loginForm.username"
              placeholder="用户名"
              data-vv-as="用户名"
            ></el-input>
          </span>
        </el-form-item>

        <el-form-item class="next-row formItem">
          <span class="next-col formItemCol">
            <el-input
              name="password"
              type="password"
              prefix-icon="iconfont-password"
              v-model="loginForm.password"
              placeholder="密码"
              data-vv-as="密码"
            ></el-input>
          </span>
        </el-form-item>

        <el-form-item class="next-row formItem">
          <span class="next-col">
            <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
          </span>
        </el-form-item>

        <div class="next-row formItem">
          <el-button type="primary" :loading="isloading" @click="submitForm" class="submitBtn">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loadingInstance: null,
      isloading: false,
      loginForm: {
        username: "",
        password: "",
        remember: false
      }
    };
  },
  methods: {
    submitForm() {
      let api = "/login/login";
      let params = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.$router.push("app");
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  beforeDestroy() {
    this.loadingInstance && this.loadingInstance.close();
  }
};
</script>

<style lang="scss" scoped>
.user-login {
}

.formContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 368px;
  margin: 0 auto;
  padding: 0 3px;
}

.formItem {
  position: relative;
  margin-bottom: 25px;
  flex-direction: column;
}

.formItemCol {
  position: relative;
  margin-bottom: 5px;
}

[class*="iconfont"] {
  font-size: 16px !important;
}

.formTitle {
  text-align: center;
  margin: 0 0 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
}

.inputIcon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.submitBtn {
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
}

.checkbox {
  margin-left: 5px;
}

.tips {
  justify-content: center;
}

.tips-text {
  color: #999;
  margin-top: 3px;
  text-decoration: none;
  font-size: 13px;
}

.line {
  color: #dcd6d6;
  margin: 0 8px;
}

.next-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.next-col {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.next-input.next-input-single {
  width: 368px;
  height: 38px;
  line-height: 38px;

  input {
    padding-left: 32px;
    font-size: 13px;
  }
}

.el-checkbox {
  color: #999;
  font-size: 13px;
}
</style>
