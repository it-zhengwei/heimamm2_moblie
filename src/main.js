import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入字体图标样式
import '@/style/iconfont.css'

// 导入初始化样式
import '@/style/base.less'
// 导入normalize.css  抹平差异样式  让页面有一个统一的样式
import 'normalize.css'
// 导入flexible 根据设备的尺寸改变rem大小
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
