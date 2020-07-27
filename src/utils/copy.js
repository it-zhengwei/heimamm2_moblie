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
    if (res.data.code === 200) {
      return res.data
    } else {
      return Promise.reject(res.data.message)
    }
  },
  err => {
    return Promise.reject(err)
  }
)
export default copy
