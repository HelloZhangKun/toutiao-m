<template>
  <div class="home-containner">
    <van-nav-bar class="home-nav" fixed>
      <van-button
        slot="title"
        class="btn-search"
        type="info"
        size="small"
        icon="search"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="gengduo-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { channelList } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/articleList.vue'

export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      // 获取频道数据
      try {
        const { data } = await channelList()
        this.channels = data.data.channels
        // console.log(data)
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-containner {
  padding-top: 174px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .btn-search {
    width: 555px;
    height: 64px;
    line-height: 100%;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }
  .van-icon-search:before {
    color: #fff;
    font-size: 32px;
  }
  .channel-tabs {
    /deep/ .van-tab {
      min-width: 200px;
      color: #777;
      font-size: 28px;
      border-right: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 31px;
      height: 6px;
      margin-bottom: 8px;
      border-radius: 3px;
      background-color: #3296fa;
    }
    /deep/ .van-tab--active {
      font-size: 30px;
      color: #333;
    }
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .gengduo-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
