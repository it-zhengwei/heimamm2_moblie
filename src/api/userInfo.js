// 导入copy
import copy from '@/utils/copy.js'
// 获取用户信息
function getUserInfo () {
  return copy({
    url: '/au/info',
    needToken: true
  })
}
// 修改用户信息
function editUserInfo (data) {
  return copy({
    url: '/au/edit',
    method: 'post',
    data,
    needToken: true
  })
}
// 上传
function upload (data) {
  return copy({
    url: '/upload',
    method: 'post',
    data,
    needToken: true
  })
}
// 暴露出去
export { getUserInfo, editUserInfo, upload }
