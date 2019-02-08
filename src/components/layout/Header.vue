<template>
  <el-header>
    <div class="header-left">
      <div class="logo">
        <img src="../../assets/imgs/logo.png" alt="智能设备管理平台">
        <span>智能设备管理平台</span>
      </div>
    </div>
    <div class="header-navbar">
      <el-menu
        :default-active="activeIndex"
        text-color="#576573"
        active-text-color="#43D3B1"
        mode="horizontal"
      >
        <el-menu-item v-for="(nav,index) in navbar" :index="`${index+1}`" :key="index">{{nav.name}}</el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "2",
      navbar: [
        {
          name: "电表设备",
          router: ""
        },
        {
          name: "智能井盖",
          router: ""
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
}
</style>
