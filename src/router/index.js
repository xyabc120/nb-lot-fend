// 入口
const MAIN = resolve => require(["@/pages/index.vue"], resolve);

// 智能井盖 入口
const WELL_COVER = resolve => require(["../pages/wellCover/index.vue"], resolve);
// 设备概览
const WELL_COVER_DASHBOARD = resolve => require(["../pages/wellCover/dashboard/index.vue"], resolve);
// 设备详情
const WELL_COVER_DEVICE_INFO = resolve => require(["../pages/wellCover/deviceinfo/DeviceList.vue"], resolve);
// 设备告警
const WELL_COVER_ALARM_LIST = resolve => require(["../pages/wellCover/alarm/AlarmList.vue"], resolve);
// 设备维护
const WELL_COVER_DEVICE_MAINTAIN = resolve => require(["../pages/wellCover/devicemaintain/index.vue"], resolve);
// 设备分部
const WELL_COVER_MAP_VIEW = resolve => require(["../pages/wellCover/mapview/index.vue"], resolve);

export default [{
    path: "/",
    redirect: "/app"
  },
  {
    path: "/app",
    name: "app",
    component: MAIN,
    redirect: "/app/wellCover/dashboard",
    children: [{
      path: "/app/wellCover",
      name: "wellCover",
      component: WELL_COVER,
      children: [{
        path: "/app/wellCover/dashboard",
        name: "dashboard",
        component: WELL_COVER_DASHBOARD,
      }, {
        path: "/app/wellCover/deviceinfo",
        name: "deviceinfo",
        component: WELL_COVER_DEVICE_INFO,
      }, {
        path: "/app/wellCover/alarmList",
        name: "alarmList",
        component: WELL_COVER_ALARM_LIST,
      }, {
        path: "/app/wellCover/devicemaintain",
        name: "devicemaintain",
        component: WELL_COVER_DEVICE_MAINTAIN,
      }, {
        path: "/app/wellCover/mapview",
        name: "mapview",
        component: WELL_COVER_MAP_VIEW,
      }]
    }]
  }
];
