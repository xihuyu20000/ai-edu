import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:33333/api";
Vue.prototype.$http = axios;
