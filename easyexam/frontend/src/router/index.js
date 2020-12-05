import Vue from 'vue'
import VueRouter from 'vue-router'
import Exam from '../views/Exam.vue'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'
import ReportExam from '../views/ReportExam.vue'
import ReportStu from '../views/ReportStu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exam',
    name: 'exam',
    component: Exam
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/reportExam',
    name: 'reportExam',
    component: ReportExam
  },
  {
    path: '/reportStu',
    name: 'reportStu',
    component: ReportStu
  }
]

const router = new VueRouter({
  routes
})

export default router
