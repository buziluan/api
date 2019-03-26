/*
 * @Description: iview组件库引用及部分组件的配置封装
 * @Author: 房旭
 * @Date: 2019-02-17 11:24:49
 * @LastEditors: 房旭
 * @LastEditTime: 2019-02-18 12:00:13
 */
import Vue from "vue";
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
//全局提示持续时间3s
Vue.prototype.$Message.config({
  duration: 3
});
