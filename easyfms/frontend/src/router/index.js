import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/common/Home.vue'
import Default from '@/views/common/Default.vue'
import Login from '@/views/common/Login.vue'
import V404 from '@/views/common/404.vue'
import IndexRole from '@/views/sys/IndexRole.vue'
import IndexOrg from '@/views/sys/IndexOrg.vue'
import IndexRes from '@/views/sys/IndexRes.vue'
import IndexUser from '@/views/sys/IndexUser.vue'
import ListAuth from '@/views/sys/auth/ListAuth.vue'
import ListDict from '@/views/sys/dict/ListDict.vue'
import ListRule from '@/views/sys/rule/ListRule.vue'
import DesignForm from '@/views/dev/form/DesignForm.vue'
import IndexMaterial from '@/views/teach/IndexMaterial.vue'
import IndexPlan from '@/views/teach/IndexPlan.vue'
import IndexScheduler from '@/views/teach/IndexScheduler.vue'
import IndexExamRoom from '@/views/center/IndexExamRoom.vue'
import IndexExamScreen from '@/views/center/IndexExamScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/', redirect: '/default' },
      {
        path: '/default',
        name: '首页',
        component: Default
      },
      {
        path: '/sys/res/index',
        name: '资源列表',
        component: IndexRes
      },
      {
        path: '/sys/role/index',
        name: '角色列表',
        component: IndexRole
      },
      {
        path: '/sys/org/index',
        name: '组织机构列表',
        component: IndexOrg
      },
      {
        path: '/sys/user/index',
        name: '用户列表',
        component: IndexUser
      },
      {
        path: '/sys/auth/index',
        name: '授权列表',
        component: ListAuth
      },
      {
        path: '/sys/dict/index',
        name: '数据字典',
        component: ListDict
      },
      {
        path: '/sys/rule/index',
        name: '校验规则',
        component: ListRule
      },
      {
        path: '/dev/form/design',
        name: '制作表单',
        component: DesignForm
      },
      {
        path: '/teach/material/index',
        name: '教案',
        component: IndexMaterial
      },
      {
        path: '/teach/scheduler/index',
        name: '教学计划',
        component: IndexScheduler
      },
      {
        path: '/teach/plan/index',
        name: '教学计划',
        component: IndexPlan
      },
      {
        path: '/center/examroom/index',
        name: '进入考场',
        component: IndexExamRoom
      },
      {
        path: '/center/examscreen/index',
        name: '考试中',
        component: IndexExamScreen
      },
      {
        path: '/a',
        name: 'a',
        component: () => import('../views/common/template/A.vue')
      }
    ]
  },

  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '*',
    component: V404
  }
]

// const requireComponent = require.context('../views/common/template/', false, /.*\.vue$/)
// requireComponent.keys().forEach(fileName => {
//   console.log('加载', fileName, require('@/views/common/template/A.vue'))
// })

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
