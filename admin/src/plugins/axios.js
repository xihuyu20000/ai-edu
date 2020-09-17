import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:33333/api";

axios.interceptors.request.use(config => {
  config.headers["Authorization"] = sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
