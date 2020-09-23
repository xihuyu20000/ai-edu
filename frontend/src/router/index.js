import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import Default from '../views/Default.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: '登录', component: Login },
  {
    path: '/',
    name: '布局',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/default'
      },
      {
        path: '/default',
        name: '首页',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Default
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
