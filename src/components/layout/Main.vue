<template>
<div class="main">
    <!-- 左边菜单 -->
    <div class="menu">
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#2d3e50"
        text-color="#929EAA"
        active-text-color="#fff"
         @open="handleOpen"
        @close="handleClose"
        :router="true">
            <el-menu-item v-for="route in menuList" :index="route.path"  :key="route.path" :route="route.router" :class="$route.path==route.path?'is-active':''">
                <i :class="route.icon"></i>
                <span slot="title">{{route.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
    <!-- 右边页面 -->
    <!--  -->
    <div class="content">
        <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
            <router-view></router-view>
        </el-scrollbar>
    </div>
</div>
</template>

<script>
export default {
    name: "Main",
    data() {
        return {
          activeIndex:'0',
            menuList: [{
                    icon: "el-icon-menu",
                    name: "设备概览",
                    path: "/app/wellCover/dashboard"
                },
                {
                    icon: "el-icon-mobile-phone",
                    name: "设备管理",
                    path: "/app/wellCover/devicemanager"
                },
                {
                    icon: "el-icon-bell",
                    name: "设备告警",
                    path: "/app/wellCover/alarmList"
                },
                {
                    icon: "el-icon-location-outline",
                    name: "设备分布",
                    path: "/app/wellCover/mapview"
                },
                {
                    icon: "el-icon-tickets",
                    name: "工单管理",
                    path: "/app/workorder"
                },
                // {
                //   icon: "el-icon-user",
                //   name: "用户管理",
                //   path: "/app/usermanage"
                // },
                // {
                //   icon: "el-icon-setting",
                //   name: "系统设置",
                //   path: "/app/systemconfig"
                // }
            ]
        };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log('handleOpen:',key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
};
</script>

<style lang="scss">
.main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    .menu {
        width: 215px;
        height: 100%;
        background-color: #2d3e50;
        font-size: 15px;
        color: #ffffff;

        .el-menu-vertical-demo {
            border: 1px;
        }
    }

    .content {
        width: calc(100% - 215px);
        height: calc(100% - 60px);
        padding: 10px;
        box-sizing: border-box;
        background: #f5f5f5;
    }

    .default-scrollbar {
        width: 100%;
        height: 100%;
    }

    .flex-scrollbar {
        width: auto;
        height: auto;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .el-scrollbar__wrap.default-scrollbar__wrap {
        overflow-x: auto;
    }

    .el-scrollbar__view.default-scrollbar__view {}

    .el-scrollbar__view.p20-scrollbar__view {
        padding: 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
    }
}
</style>
