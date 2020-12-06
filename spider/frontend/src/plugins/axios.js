import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://localhost:33333/api/'
Vue.prototype.$http = axios //全局注册，使用方法为:this.$axios

// http请求拦截器
import { Loading } from 'element-ui'
var loadinginstace
axios.interceptors.request.use(
  config => {
    // element ui Loading方法
    loadinginstace = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)',
      customClass: 'osloading',
      fullscreen: true
    })
    return config
  },
  error => {
    loadinginstace.close()
    return Promise.reject(error)
  }
)

// http response 服务器响应拦截器，
// 这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    if (response.data.data && response.data.data.ecode == '401') {
      loadinginstace.close()
      router.replace({
        path: '/login'
        // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      })
    } else {
      loadinginstace.close()
      return response
    }
  },
  error => {
    loadinginstace.close()
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: '/login'
            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

Vue.prototype.$serUrl = data => {
  let url = ''
  for (let i in data) {
    url += '&' + i + '=' + data[i]
  }
  return url
}
