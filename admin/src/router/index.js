import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
