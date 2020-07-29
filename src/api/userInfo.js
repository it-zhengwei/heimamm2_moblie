// 导入copy
import copy from '@/utils/copy.js'
// 获取用户信息
function getUserInfo () {
  return copy({
    url: '/au/info',
    needToken: true
  })
}
// 暴露出去
export { getUserInfo }
