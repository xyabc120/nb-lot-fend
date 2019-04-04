// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../theme/element-variables.scss"; // 主题
// 引入路由配置
import routers from "./router/index";
// 引入store
import store from './vuex/store'
// 异步请求
import HttpAgent from '@/api/index.js'
// 高德地图
import VueAMap from 'vue-amap';
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

Vue.prototype.$fetch = HttpAgent

Vue.config.productionTip = false;
// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '7af099c49bc59b423c4998a8bc01706b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

const router = new VueRouter({
  routes: routers
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store, // 全局注入
  components: {
    App
  },
  template: "<App/>"
});
