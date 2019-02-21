// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入路由配置
import routers from "./router/index";
// 引入store
import store from './vuex/store'
// 异步请求
import HttpAgent from '@/api/index.js'
// 高德地图
import VueAMap from 'vue-amap';

Vue.prototype.$fetch = HttpAgent

Vue.config.productionTip = false;

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
