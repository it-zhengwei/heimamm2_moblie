const key = 'TOKEN'
// 设置token
function setToken (token) {
  window.localStorage.setItem(key, token)
}
// 获取token
function getToken () {
  return window.localStorage.getItem(key)
}
// 删除token
function removeToken () {
  window.localStorage.removeItem(key)
}
// 暴露出去
export { setToken, getToken, removeToken }
