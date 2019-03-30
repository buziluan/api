/*
 * @Description: axios插件，对axios进行封装配置。
 * @Author: 房旭
 * @Date: 2019-02-17 11:21:05
 * @LastEditors: 房旭
 * @LastEditTime: 2019-03-30 16:15:12
 */
//执行严格模式
"use strict";

import Vue from "vue";
import axios from "axios";

let config = {
  headers: {
    //设置请求头，使用json
    "Content-Type": "application/json;charset=UTF-8",
  }
};

//创建一个axios实例
const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // 发送请求前做什么
    if (!/login$/.test(config.url)) {
      let token = sessionStorage.getItem("token");
      config.headers.Authorization = token
    }
    return config;
  },
  function(error) {
    //处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    if (response.status != 200) {
      Vue.prototype.$Message.info("网络错误" + response.status);
    }
    return response;
  },
  function(error) {
    Vue.prototype.$Message.error(error.toString());
    return Promise.reject(error);
  }
);

let VueAxios = new Object();

VueAxios.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};
//使用VueAxios
Vue.use(VueAxios);

//导出
export default VueAxios;
