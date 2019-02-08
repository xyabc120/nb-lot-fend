<template>
  <div class="main">
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#2d3e50"
        text-color="#929EAA"
        active-text-color="#fff"
      >
        <el-menu-item :index="''+index" v-for="(item, index) in menuList" :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
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
          router: ""
        },
        {
          icon: "el-icon-tickets",
          menuName: "设备详情",
          router: ""
        },
        {
          icon: "el-icon-bell",
          menuName: "设备告警",
          router: ""
        },
        {
          icon: "el-icon-setting",
          menuName: "设备维护",
          router: ""
        },
        {
          icon: "el-icon-location-outline",
          menuName: "设备分部",
          router: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main {
  // border: 1px solid red;
  display: flex;
  height: 100%;

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
}
</style>
