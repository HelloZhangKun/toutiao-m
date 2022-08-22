<template>
  <div id="app">
    <h1>黑马头条</h1>
    <van-button type="primary">主要按钮</van-button>
    <div>
      <i class="iconfont icon-lishi"></i>
    </div>
    <div class="box"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.box {
  width: 100px;
  height: 100px;
}
</style>
