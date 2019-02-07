// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入路由配置
import routers from "./router/index";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes: routers
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
