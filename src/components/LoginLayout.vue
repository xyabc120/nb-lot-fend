<template>
  <div class="wrapper-container">
    <div class="app-wrapper">
      <div ref="stars" class="stars">
        <div class="star" v-for="count in stars" :key="count.item" :style="count.style"></div>
      </div>
      <div class="header">
        <a href="#" class="meta">
          <img class="logo" :src="img_logo" alt="logo">
          <span class="title">QT-Iot</span>
        </a>
        <p class="desc">智能设备管理平台</p>
      </div>

      <router-view></router-view>

      <div class="footer">
        <div class="links">
          <a href="#" class="link">帮助</a>
          <a href="#" class="link">隐私</a>
          <a href="#" class="link" style="margin-right: 0">条款</a>
        </div>
        <div class="copyright">CopyRight 2018 版权所有 契通(上海) 苏ICP备18031899号</div>
        <img class="bgsource" src="../assets/imgs/earth.png" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import img_logo from "@/assets/imgs/qt_logo.png";
import seot from "@/assets/script/stopExecutionOnTimeout.js";

export default {
  data() {
    return {
      img_logo,
      stars: []
    };
  },
  created(){
    let counter = 800;
    for (var i = 0; i < counter; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        this.stars.push({ item: i, style: null});
    }
    window.CP.exitedLoop(1);
    this.stars.forEach(item =>{
      let s = 0.2 + Math.random() * 1;
      let r = counter + Math.random() * 300;
      item.style = {
            transformOrigin: '0 0 ' + r + 'px',
            transform: ' translate3d(0,0,-' + r + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        }
    })
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
  // background: #f0f2f5;
  // background-image: url(../assets/imgs/loginbg.png);
  // background-size: contain;

  background: -webkit-linear-gradient(left top, #28405C 10%, #1A2F49 30%, #131F37 50%, #11192E 70%, #101327 100%); 
  background: -o-linear-gradient(bottom right, #28405C 10%, #1A2F49 30%, #131F37 50%, #11192E 70%, #101327 100%); 
  background: -moz-linear-gradient(bottom right, #28405C 10%, #1A2F49 30%, #131F37 50%, #11192E 70%, #101327 100%); 
  background: linear-gradient(to bottom right, #28405C 10%, #1A2F49 30%, #131F37 50%, #11192E 70%, #101327 100%);

  background-attachment: fixed;
  overflow: hidden;

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
    color: rgba(255, 255, 255, 0.85);
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
  .desc {
    margin: 10px 0;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.55);
  }
  .logo {
    margin-right: 10px;
    width: 105px;
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
    bottom: 0;
  }
  .links {
    margin-bottom: 8px;
  }
  .link {
    color: inherit;
    margin-right: 40px;
  }
  .copyright {
    text-align: right;
    margin-bottom: 15px;
  }
  .links,.copyright{
    z-index: 10;
    height: 20px;
    color: #ddd;
    font-size: 13px;
    line-height: 20px;
    position: relative;
  }
  .bgsource{
		bottom: 0;
		margin: auto;
    user-select: none;
		position: absolute;
	}
  @keyframes rotate {
	  0% {
	    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
	  }
	  100% {
	    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
	  }
	}
	.stars {
	  transform: perspective(500px);
	  transform-style: preserve-3d;
	  position: absolute;
	  bottom: 0;
	  perspective-origin: 50% 100%;
	  left: 50%;
	  animation: rotate 90s infinite linear;
	}

	.star {
	  width: 2px;
	  height: 2px;
	  background: #F7F7B6;
	  position: absolute;
	  top: 0;
	  left: 0;
	  transform-origin: 0 0 -300px;
	  transform: translate3d(0, 0, -300px);
	  backface-visibility: hidden;
	}
}
</style>
