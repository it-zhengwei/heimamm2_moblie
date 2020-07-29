import axios from 'axios'
// 导入获取token的工具文件
import { getToken } from '@/utils/local.js'
const copy = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
copy.interceptors.request.use(
  config => {
    // 因为请求配置里配置的属性都是保存在config配置项  所以给一个是否需要携带token的状态值
    if (config.needToken) {
      // 需要携带token
      // 判断是否有token
      if (getToken()) {
        //  请求头携带token
        config.headers.authorization = 'Bearer ' + getToken()
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
copy.interceptors.response.use(
  res => {
    // 声明一个常量保存code
    const code = res.data.code
    if (code === 200) {
      return res.data
    } else if (code === 400 || code === 401 || code === 403) {
      return Promise.reject(new Error(res.data.message))
    } else {
      return Promise.reject(new Error())
    }
  },
  err => {
    return Promise.reject(err)
  }
)
export default copy
