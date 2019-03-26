/*
 * @Description: 全局vue过滤器
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-02-26 14:02:00
 * @LastEditTime: 2019-02-26 14:56:24
 */
import Vue from "vue";
import miment from "miment";
//时间过滤器，讲时间戳转成YYYY-MM-DD HH:mm:ss
Vue.filter("format", tiem => miment(new Date(tiem)).format("YYYY-MM-DD hh:mm:ss"))