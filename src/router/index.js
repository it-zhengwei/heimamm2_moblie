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
// 登录组件
import login from '@/views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login,
    meta: {
      isShow: false
    }
  },
  {
    path: '/company',
    component: company,
    meta: {
      isShow: true
    }
  },
  {
    path: '/find',
    component: find,
    meta: {
      isShow: true
    }
  },
  {
    path: '/my',
    component: my,
    meta: {
      isShow: true
    }
  },
  {
    path: '/question',
    component: question,
    meta: {
      isShow: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
