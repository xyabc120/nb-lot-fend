<template>
<el-header>
    <div class="header-left">
        <div class="logo">
            <img src="../../assets/imgs/qt_logo.png" alt="智能设备管理平台">
            <span>智能终端管理平台</span>
        </div>
    </div>

    <div class="header-right">
        <div class="header-navbar">
            <el-menu :default-active="activeIndex" text-color="#576573" active-text-color="#43D3B1" mode="horizontal">
                <el-menu-item v-for="(nav,index) in navbar" :index="`${index+1}`" :key="index" :route="nav.router">{{nav.name}}</el-menu-item>
            </el-menu>
        </div>

        <el-dropdown @command="handleCommand">
            <span class="current-user el-dropdown-link">
          管理员
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editInfo" icon="el-icon-edit">修改信息</el-dropdown-item>
                <el-dropdown-item command="setings" icon="el-icon-setting">系统设置</el-dropdown-item>
                <el-dropdown-item command="usersManage" icon="el-icon-user">用户管理</el-dropdown-item>
                <el-dropdown-item command="signout" icon="el-icon-switch-button">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</el-header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            activeIndex: "2",
            navbar: [{
                    name: "电表设备",
                    router: ""
                },
                {
                    name: "智能井盖",
                    router: "/app/wellCover/dashboard"
                },
                {
                    name: "烟感设备",
                    router: ""
                },
                {
                    name: "燃气设备",
                    router: ""
                }
            ]
        };
    },
    methods: {
        handleCommand(command) {

            if (command === "editInfo") {
                console.log("editInfo");
                this.$message({
                    message: "该功能正在维护中……",
                    type: "info"
                });
            } else if (command === "setings") {
                console.log("setings");
                this.$router.replace({
                    path: "/app/systemconfig"
                });
            } else if (command === "usersManage") {
                console.log("usersManage");
                this.$router.replace({
                    path: "/app/usermanage"
                });
            } else if (command === "signout") {
                console.log("signout……！");
                this.$router.replace({
                    path: "/login"
                });
            }
        }
    }
};
</script>

<style lang="scss">
.el-header {
    width: 100%;
    background-color: #fff;
    color: #576573;
    line-height: 60px;
    padding: 0px;
    display: flex;

    .header-left {
        width: 195px;
        height: 60px;
        background-color: #2d3e50;
        padding: 0 0 0 20px;
        align-items: center;

        .logo {
            display: flex;
            padding: 20px 0px;

            img {
                width: 28.9px;
                height: 22px;
                align-items: center;
            }

            span {
                align-items: center;
                opacity: 0.8;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #ffffff;
                text-align: left;
                height: 25px;
                line-height: 25px;
                margin-left: 8px;
            }
        }
    }

    .header-right {
        width: calc(100% - 255px);
        padding: 0 20px;
        display: flex;
        justify-content: space-between;

        .right-btn {
            background: #f5f5f5;
            width: 120px;
            height: 40px;
            line-height: 40px;
            margin-top: 10px;
            float: right;
        }
    }
}
</style>
