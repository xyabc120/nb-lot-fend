<template>
  <div class="wrapper-container">
    <div class="app-wrapper">
      <div class="header">
        <a href="#" class="meta">
          <img class="logo" :src="img_logo" alt="logo">
          <!-- <span class="title">QT-Iot</span> -->
        </a>
        <!-- <p class="desc">智能设备管理平台</p> -->
      </div>

      <router-view></router-view>

      <div class="footer">
        <div class="links">
          <a href="#" class="link">帮助</a>
          <a href="#" class="link">隐私</a>
          <a href="#" class="link" style="margin-right: 0">条款</a>
        </div>
        <div class="copyright">CopyRight 2018 版权所有 契通(上海) 苏ICP备18031899号</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import img_logo from "@/assets/imgs/logo-qt.png";

export default {
  data() {
    return {
      img_logo
    };
  }
};
</script>

<style lang="scss">
.app-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;

  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  background: #f0f2f5;
  background-image: url(../assets/imgs/loginbg.png);
  background-size: contain;

  @media (max-width: 767px) {
    padding-top: 50px;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  }
  .meta {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .title {
    text-align: center;
    font-size: 33px;
    color: rgba(0, 0, 0, 0.85);
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
  .desc {
    margin: 10px 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .logo {
    margin-right: 10px;
    width: 205px;
  }
  .el-checkbox__label {
    font-size: 13px;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20px;
  }
  .links {
    margin-bottom: 8px;
  }
  .link {
    font-size: 13px;
    margin-right: 40px;
    color: rgba(0, 0, 0, 0.45);
  }
  .copyright {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 1.5;
    text-align: right;
  }
}
</style>
