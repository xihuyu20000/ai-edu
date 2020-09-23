import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Default from '@/views/Default.vue'
import Login from '@/views/Login.vue'
import ListRole from '@/views/sys/role/ListRole.vue'
import ListOrg from '@/views/sys/org/ListOrg.vue'
import ListRes from '@/views/sys/res/ListRes.vue'
import ListUser from '@/views/sys/user/ListUser.vue'
import ListAuth from '@/views/sys/auth/ListAuth.vue'
import ListDict from '@/views/sys/dict/ListDict.vue'
import DataTemplate1Loader from '@/components/DataTemplate1Loader.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/sys/res/list',
        name: '资源列表',
        component: ListRes
      },
      {
        path: '/sys/role/list',
        name: '角色列表',
        component: ListRole
      },
      {
        path: '/sys/org/list',
        name: '组织机构列表',
        component: ListOrg
      },
      {
        path: '/sys/user/list',
        name: '用户列表',
        component: ListUser
      },
      {
        path: '/sys/auth/list',
        name: '授权列表',
        component: ListAuth
      },
      {
        path: '/sys/dict/list',
        name: '数据字典',
        component: ListDict
      },
      {
        path: '/dt1/:id',
        name: 'dt1',
        component: DataTemplate1Loader
      }
    ]
  },
  {
    path: '/default',
    name: '首页',
    component: Default
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log("from", from);
  // 获取token
  const token = sessionStorage.getItem('token')
  // 如果是登录或者有token，则通过
  if (to.path === '/login' || token) return next()
  console.error('未授权用户，请登录')
  next('/login')
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
