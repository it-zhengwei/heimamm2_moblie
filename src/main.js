import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入flexible 根据设备的尺寸改变rem大小
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
