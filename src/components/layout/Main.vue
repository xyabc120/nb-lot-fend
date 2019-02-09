<template>
  <div class="main">
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
          icon: "el-icon-tickets",
          menuName: "设备详情",
          router: "deviceinfo"
        },
        {
          icon: "el-icon-bell",
          menuName: "设备告警",
          router: "alarmList"
        },
        {
          icon: "el-icon-setting",
          menuName: "设备维护",
          router: "devicemaintain"
        },
        {
          icon: "el-icon-location-outline",
          menuName: "设备分部",
          router: "mapview"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main {
  // border: 1px solid red;
  height: 100%;

  .menu {
    width: 215px;
    height: 100%;
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
    height: 100%;
    margin-left: 215px;
    padding: 10px;
  }
}
</style>
