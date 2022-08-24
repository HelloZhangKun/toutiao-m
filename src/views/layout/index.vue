<template>
  <div class="layout-containner">
    <router-view></router-view>

    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <i slot="icon" class="iconfont icon-shouye" />
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <span>问答</span>
        <i slot="icon" class="iconfont icon-wenda" />
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <span>视频</span>
        <i slot="icon" class="iconfont icon-shipin" />
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>{{$store.state.user ? '已登录' : '我的'}}</span>
        <i slot="icon" class="iconfont icon-wode" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-containner {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
  }
}
</style>
