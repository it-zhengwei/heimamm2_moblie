<template>
  <van-cell :title="title" :value="value" @click="parent" class="cell">
    <template #icon>
      <i class="iconfont" :class="icon"></i>
    </template>
    <template>
      <slot></slot>
    </template>
    <template #right-icon>
      <i class="iconfont iconicon_more"></i>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'cell',
  props: ['title', 'value', 'icon'],
  methods: {
    parent () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.cell {
  height: 55px;

  .iconicon_more {
    font-size: 14px;
    margin-left: 4px;
  }
}
</style>
