import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ListUser from "@/views/sys/user/ListUser.vue";
import ListRole from "@/views/sys/role/ListRole.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/sys/user/list",
        name: "user-list",
        component: ListUser,
      },
      {
        path: "/sys/role/list",
        name: "role-list",
        component: ListRole,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("from", from);
  // 获取token
  const token = sessionStorage.getItem("token");
  // 如果是登录或者有token，则通过
  if (to.path === "/login" || token) return next();
  console.error("未授权用户，请登录");
  next("/login");
});

export default router;
