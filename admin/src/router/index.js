import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ListUser from "@/views/sys/user/ListUser.vue";
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
        component: ListUser
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  console.log("from", from);
  if (to.path === "/login" || token) return next();
  next("/login");
});

export default router;
