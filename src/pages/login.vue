<template>
<div class="user-login">
    <div class="formContainer">
        <h4 class="formTitle">登 录</h4>
        <el-form :model="loginForm" class="formItems" ref="loginForm" :rules="rules">
            <el-form-item class="next-row formItem" prop="username">
                <span class="next-col formItemCol">
            <el-input
              autofocus
              clearable
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
              placeholder="用户名"
              @keyup.enter.native="checkLogin('loginForm')"
            ></el-input>
          </span>
            </el-form-item>

            <el-form-item class="next-row formItem" prop="password">
                <span class="next-col formItemCol">
            <el-input
              type="password"
              clearable
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              placeholder="密码"
              @keyup.enter.native="checkLogin('loginForm')"
            ></el-input>
          </span>
            </el-form-item>

            <el-form-item class="next-row formItem">
                <span class="next-col">
            <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
          </span>
            </el-form-item>

            <div class="next-row formItem">
                <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" :loading="fullscreenLoading" @click="checkLogin('loginForm')" class="submitBtn">登录</el-button>
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
            fullscreenLoading: false,
            loginForm: {
                username: "",
                password: "",
                remember: false
            },
            rules: {
                username: [{
                        required: true,
                        message: '请输入登录名',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '登录名最大长度在为20个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: '长度在6到 20个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        checkLogin(loginForm) {
            this.$refs[loginForm].validate(valid => {
                if (valid) {
                    this.submitForm();
                } else {
                    this.$message.error('登录验证失败');
                    return false;
                }
            })
        },
        submitForm() {
            this.fullscreenLoading = true;
            let api = "/login/login";
            let params = {
                username: this.loginForm.username,
                password: this.loginForm.password
            };
            this.$fetch
                .post(api, params)
                .then(res => {
                    if (res.code === 10000) {
                        this.$fetch.config.headers["QT-USER-TOKEN"] = res.data.authToken;
                        window.sessionStorage.setItem(
                            "QT-USER-TOKEN",
                            res.data && res.data.authToken
                        );
                        this.fullscreenLoading = false;
                        this.$router.push("app");
                    } else {
                        this.fullscreenLoading = false;
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err.message);
                    this.fullscreenLoading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.formContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 338px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    background: rgba(255, 255, 255, .08);
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
    font-size: 20px;
    color: rgba(255, 255, 255, 0.85);
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

.el-input /deep/ input {
    background-color: #e8f0fe;

    &::-webkit-input-placeholder {
        color: #5e6064;
    }

    &::-moz-placeholder {
        color: #5e6064;
    }

    &:-ms-input-placeholder {
        color: #5e6064;
    }
}
</style>
