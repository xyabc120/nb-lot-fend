<template>
  <div class="main">
    <!-- 左边菜单 -->
    <div class="menu">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#2d3e50"
        text-color="#929EAA"
        active-text-color="#fff"
        :router="true"
      >
        <el-menu-item
          :index="''+index"
          v-for="(item, index) in menuList"
          :key="index"
          :route="item.router"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右边页面 -->
    <router-view class="content"></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      menuList: [
        {
          icon: "el-icon-menu",
          menuName: "设备概览",
          router: "dashboard"
        },
        {
          icon: "el-icon-mobile-phone",
          menuName: "设备管理",
          router: "devicelist"
        },
        {
          icon: "el-icon-bell",
          menuName: "设备告警",
          router: "alarmList"
        },
        {
          icon: "el-icon-location-outline",
          menuName: "设备分部",
          router: "mapview"
        },
        {
          icon: "el-icon-tickets",
          menuName: "工单管理",
          router: "workorder"
        },
        {
          icon: "el-icon-setting",
          menuName: "系统设置",
          router: "systemconfig"
        },
        {
          icon: "el-icon-edit-outline",
          menuName: "用户管理",
          router: "usermanage"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main {
  height: 100%;
  .menu {
    width: 215px;
    height: 100%;
    height: calc(100% - 60px);
    position: absolute;
    left: 0;
    background-color: #2d3e50;
    font-size: 15px;
    color: #ffffff;
    .el-menu-vertical-demo {
      border: 1px;
    }
  }

  .content {
    margin-left: 215px;
    height: calc(100% - 110px);
    padding: 10px;
    background: #f5f5f5;
  }
}
</style>
