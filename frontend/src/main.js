import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/bus'
import './plugins/antd'
import './plugins/axios'
import './plugins/bootstrap4'
import './components/comps'

import './assets/css/_global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
