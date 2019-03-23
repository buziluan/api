import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
var instance = axios.create()
Vue.prototype.$http = instance
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
