import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入我的资料组件
import profile from '@/views/profile/index.vue'

// 导入userInfo  api
import { getUserInfo } from '@/api/userInfo.js'
// 导入local文件
import { getToken, removeToken } from '@/utils/local.js'
// 导入Toast组件
import { Toast } from 'vant'
// 导入store
import store from '@/store/index.js'
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
      isShow: true,
      // 需要登录的状态
      needLogin: true
    }
  },
  {
    path: '/question',
    component: question,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: profile,
    meta: {
      // 需要登录状态
      needLogin: true
    }
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

// 注册导航守卫
router.beforeEach((to, from, next) => {
  // 登录校验
  // 判断当前页面是否是登录才能访问
  if (to.meta.needLogin) {
    // 判断是否登录了
    if (store.state.isLogin) {
      // 因为刷新会导致vuex的内容重置  但是token还在 所以要判断是否存在token 如果存在就获取用户信息 保存起来 并且允许通过  如果token是无效或者伪造 就删除token 提示用户 跳转到登录页
      next()
    } else {
      // 如果不存在token 就强制跳转到登录页 提示用户
      // 没有登录
      if (getToken()) {
        // 获取用户信息
        getUserInfo()
          .then(res => {
            // 给图片地址拼接基地址
            res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
            // 保存起来  不然我的页面没有信息
            store.commit('USERINFO', res.data)
            // 修改登录状态
            store.commit('ISLOGIN', true)
            // 允许通过
            next()
          })
          .catch(() => {
            // token有误
            // 删除token
            removeToken()
            // 提示用户
            Toast.fail('请登录')
            // 跳转到登录页
            next('/login?target=' + to.fullPath)
          })
      } else {
        // 提示用户
        Toast.fail('请登录')
        // 强制切换到login页面  并且记录目标页面
        next('/login?target=' + to.fullPath)
      }
    }
  } else {
    // 不需要登录 允许通过
    next()
  }
})
export default router
