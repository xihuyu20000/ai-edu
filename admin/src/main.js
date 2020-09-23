/* eslint-disable no-prototype-builtins */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/element.js'
import '@/plugins/axios.js'
import '@/plugins/bv.js'
import '@/plugins/bus'
import '@/plugins/config'

import '@/components/_globals.js'

import '@/assets/css/global.css'
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$ser = function(obj) {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
