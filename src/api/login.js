import copy from '@/utils/copy.js'
// 获取验证码
function getCode (data) {
  return copy({
    url: '/au/code',
    method: 'post',
    data
  })
}
// 登录接口
function login (data) {
  return copy({
    url: '/au/login',
    method: 'post',
    data
  })
}
// 暴露出去
export { getCode, login }
