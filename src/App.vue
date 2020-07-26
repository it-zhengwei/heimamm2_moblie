<template>
  <div class="app">
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      route
      active-color="#e40137"
      inactive-color="#B4B4BD"
    >
      <van-tabbar-item to="/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_liulanliang"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_sel"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.app {
  i {
    font-size: 28px;
  }
}
</style>
