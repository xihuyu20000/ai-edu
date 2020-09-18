import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:33333/api";
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    console.log("请求", config);
    config.headers["Authorization"] = sessionStorage.getItem("token");
    return config;
  },
  (error) => {
    console.log("axios报错", error); // for debug
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;
