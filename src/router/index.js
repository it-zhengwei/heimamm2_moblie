import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
// 公司组件
import company from '@/views/company/index.vue'
// 发现组件
import find from '@/views/find/index.vue'
// 我的组件
import my from '@/views/my/index.vue'
// 问题组件
import question from '@/views/question/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/company'
  },
  {
    path: '/company',
    component: company
  },
  {
    path: '/find',
    component: find
  },
  {
    path: '/my',
    component: my
  },
  {
    path: '/question',
    component: question
  }
]

const router = new VueRouter({
  routes
})

export default router
