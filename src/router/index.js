// 入口
const MAIN = resolve => require(["@/pages/index.vue"], resolve);

export default [
  { path: "/", redirect: "/app" },
  {
    path: "/app",
    name: "app",
    component: MAIN,
    children: []
  }
];
