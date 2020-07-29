import axios from 'axios'
const copy = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
copy.interceptors.request.use(
  config => {
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
