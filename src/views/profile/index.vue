<template>
  <div class="profile">
    <navBar @onClickLeft="onClickLeft" title="我的资料" class="navBar"></navBar>
    <cell title="头像" class="photo">
      <template>
        <img :src="userInfo.avatar" alt="" />
      </template>
    </cell>
    <van-cell-group class="cellList">
      <cell title="昵称" :value="userInfo.nickname"></cell>
      <cell title="性别" :value="getGender"></cell>
      <cell title="地区" :value="北京市"></cell>
      <cell title="个人简介" :value="userInfo.intro"></cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入map辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'profile',
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['getGender'])
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.profile {
  padding: 0 15px;
  .navBar {
    height: 44px;
    margin-bottom: 18px;
    .van-nav-bar {
      margin: 0 -15px;

      padding: 0 15px;
    }
    .van-nav-bar__title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;

      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
  }
  .photo {
    height: 60px;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    img {
      height: 44px;
      width: 44px;
      border-radius: 50%;
      margin-top: 10px;
    }
  }
  .cellList {
    border-radius: 8px;
    overflow: hidden;
    .van-cell {
      align-items: center;
      &:last-child {
        .van-cell__value {
          flex: 2;
        }
      }
    }
  }
}
</style>
