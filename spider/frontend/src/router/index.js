import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article'
import Author from '../views/Author'

require('../plugins/axios')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  },
  {
    path: '/author/:id',
    name: 'author',
    component: Author
  }
]

const router = new VueRouter({
  routes
})

export default router
