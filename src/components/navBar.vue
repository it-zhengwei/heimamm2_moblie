<template>
  <div class="navBar">
    <van-nav-bar
      :title="title"
      :right-text="value"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <i class="iconfont iconbtn_nav_back"></i>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    title: String,
    value: String
  },
  methods: {
    // 点击左边触发的方法
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    // 点击右边触发的方法
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>

<style lang="less">
.navBar {
  height: 44px;
}
</style>
