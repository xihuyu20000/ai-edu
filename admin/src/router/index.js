import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ListRole from "@/views/sys/role/ListRole.vue";
import ListOrg from "@/views/sys/org/ListOrg.vue";
import ListRes from "@/views/sys/res/ListRes.vue";
import ListStaff from "@/views/sys/staff/ListStaff.vue";
import ListStudent from "@/views/sys/student/ListStudent.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/sys/res/list",
        name: "res-list",
        component: ListRes,
      },
      {
        path: "/sys/role/list",
        name: "role-list",
        component: ListRole,
      },
      {
        path: "/sys/org/list",
        name: "org-list",
        component: ListOrg,
      },
      {
        path: "/sys/staff/list",
        name: "staff-list",
        component: ListStaff,
      },
      {
        path: "/sys/student/list",
        name: "student-list",
        component: ListStudent,
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

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
