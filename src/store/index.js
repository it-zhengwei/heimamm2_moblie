import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置一个是否登录的状态属性
    isLogin: false,
    userInfo: ''
  },
  mutations: {
    // 修改用户信息
    USERINFO (state, data) {
      state.userInfo = data
    },
    // 修改登录状态
    ISLOGIN (state, data) {
      state.isLogin = data
    },
    // 修改部分用户信息
    EIDTPARTUSERINFO (state, { key, value }) {
      state.userInfo[key] = value
    }
  },
  getters: {
    // 计算性别
    getGender (state) {
      const Arr = ['未知', '男', '女']
      return Arr[state.userInfo.gender]
    }
  },
  actions: {},
  modules: {}
})
