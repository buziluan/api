import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import "./plugins/iview.js"; //引入iview插件
import "./plugins/axios.js"; //引入axios插件
import 'animate.css';//引入动画插件

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')