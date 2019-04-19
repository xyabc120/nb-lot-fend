// 入口
const MAIN = resolve => require(["@/pages/index.vue"], resolve);

// login 登录
const LOGIN_LAYOUT = resolve => require(["@/components/LoginLayout.vue"], resolve);
const LOGIN = resolve => require(["@/pages/login.vue"], resolve);

// 智能井盖 入口
const WELL_COVER = resolve => require(["@/pages/wellCover/index.vue"], resolve);
// 设备概览
const WELL_COVER_DASHBOARD = resolve => require(["@/pages/wellCover/dashboard/index.vue"], resolve);
// 设备管理
const WELL_COVER_DEVICE_LIST = resolve => require(["@/pages/wellCover/device/DeviceList.vue"], resolve);
// 设备编辑
const WELL_COVER_DEVICE_EDIT = resolve => require(["@/pages/wellCover/device/DeviceEdit.vue"], resolve);
// 设备详情
const WELL_COVER_DEVICE_INFO = resolve => require(["@/pages/wellCover/device/DeviceInfo.vue"], resolve);
// 设备告警
const WELL_COVER_ALARM_LIST = resolve => require(["@/pages/wellCover/alarm/AlarmList.vue"], resolve);
// 工单管理
const WELL_COVER_WORK_ORDER = resolve => require(["@/pages/wellCover/workorder/WorkOrderList.vue"], resolve);
const WELL_COVER_ADD_WORK_ORDER = resolve => require(["@/pages/wellCover/workorder/AddWorkOrder.vue"], resolve);
const WELL_COVER_WORK_ORDER_DETAIL = resolve => require(["../pages/wellCover/workorder/WorkOrderDetail.vue"], resolve);
// 设备分部
const WELL_COVER_MAP_VIEW = resolve => require(["@/pages/wellCover/mapview/index.vue"], resolve);
// 系统设置
const WELL_COVER_SYSTEM_CONFIG = resolve => require(["@/pages/wellCover/system/index.vue"], resolve);
// 用户管理
const WELL_COVER_USER_MANAGE = resolve => require(["@/pages/wellCover/user/UserList.vue"], resolve);
// 用户编辑
const WELL_COVER_USER_EDIT = resolve => require(["@/pages/wellCover/user/UserEdit.vue"], resolve);


export default [{
    path: "/",
    redirect: "/login"
  },
  {
    path: '',
    component: LOGIN_LAYOUT,
    children: [{
      path: '/login',
      name: "login",
      component: LOGIN,
    }, ]
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
          path: "/app/wellCover/devicelist",
          name: "devicelist",
          component: WELL_COVER_DEVICE_LIST,
        }, {
          path: "/app/wellCover/deviceedit/:id",
          name: "deviceedit",
          component: WELL_COVER_DEVICE_EDIT,
        },
        {
          path: "/app/wellCover/deviceinfo/:id",
          name: "deviceinfo",
          component: WELL_COVER_DEVICE_INFO,
        },
        {
          path: "/app/wellCover/alarmList",
          name: "alarmList",
          component: WELL_COVER_ALARM_LIST,
        }, {
          path: "/app/wellCover/workorder",
          name: "workorder",
          component: WELL_COVER_WORK_ORDER,
        },
        {
          path: "/app/wellCover/workorder/add",
          name: "addworkorder",
          component: WELL_COVER_ADD_WORK_ORDER,
        },
        {
          path: "/app/wellCover/workorder/:id",
          name: "workorderdetail",
          component: WELL_COVER_WORK_ORDER_DETAIL,
        },
        {
          path: "/app/wellCover/mapview",
          name: "mapview",
          component: WELL_COVER_MAP_VIEW,
        },
        {
          path: "/app/wellCover/systemconfig",
          name: "systemconfig",
          component: WELL_COVER_SYSTEM_CONFIG,
        },
        {
          path: "/app/wellCover/usermanage",
          name: "usermanage",
          component: WELL_COVER_USER_MANAGE,
        },
        {
          path: '/app/wellCover/useredit/:id',
          name: 'useredit',
          component: WELL_COVER_USER_EDIT,
        }
      ]
    }]
  }
];
