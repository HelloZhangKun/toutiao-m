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
        to="/search"
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
        <i class="iconfont icon-gengduo" @click="popupShow"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="moreShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 内容展示 -->
      <ChannelEdit
        :channels="channels"
        :active="active"
        @upDataActive="onUpDataActive"
      >
      </ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { channelList } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/articleList.vue'
// 引入弹出层组件
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState('user')
  },
  data() {
    return {
      active: 0,
      channels: [],
      moreShow: false //弹层显示
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      // 获取首页频道列表数据
      try {
        // console.log(data)
        let channels = []
        if (this.user) {
          // 如果已经登录则获取登录用户的频道列表
          const { data } = await channelList()
          channels = data.data.channels
        } else {
          // 如果没有登录则查看本地存储
          const localChannel = getItem('TOUTIAO_CHANNELS')
          if (localChannel) {
            // 如果本地存储有数据
            channels = localChannel
          } else {
            const { data } = await channelList()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    },

    popupShow() {
      // 弹出层事件
      this.moreShow = true
    },
    onUpDataActive(idx, iChannelEditShow = true) {
      this.active = idx
      this.moreShow = iChannelEditShow
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
