<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
      >
      <ArticleItem   v-for="(item, index) in list"
          :key="index" :article="item"></ArticleItem>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        >
        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
// 文章列表组件
import ArticleItem from '@/components/article-item.vue'
export default {
  name: 'ArticleList',
  props: ['channel'],
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false, //控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: '成功' //下拉刷新成功提示
    }
  },
  methods: {
    //   onLoad() {
    //     // 滚动到底部的时候会触发调用函数
    //     //1. 请求获取数据
    //     console.log('执行')
    //     setTimeout(() => {
    //       //2. 把获取到的数据放到list数组中
    //       for (let i = 0; i < 12; i++) {
    //         this.list.push(this.list.length + 1)
    //       }
    //       // 3. 本次数据加载结束之后要把加载状态设置为false
    //       // 加载状态结束 loading关闭以后才能触发下一次的加载更多
    //       this.loading = false

    //       //4. 判断数据全部加载完成
    //       if (this.list.length >= 40) {
    //         // 如果没有数据了 把finshed设置为true,之后不会再触发加载更多
    //         this.finished = true
    //       }
    //     }, 1000)
    //   }
    // }
    async onLoad() {
      // 列表数据
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        // 将数组展开push进list数组中
        this.list.push(...results)
        // 本次数据加载结束之后把加载状态设置为结束
        this.loading = false
        // 判断数据是否加载完毕
        if (results.length) {
          // 更新下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据时 将finished设置为true
          this.finished = true
        }
      } catch (error) {
        console.log('请求失败', error)
        // 请求数据错误
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      // 下拉刷新
      try {
        // 请求数据
        const { data } = await getArticle({
          channel_id: this.channel.id, //频道id
          timestamp: Date.now() //下拉每次获取最新数据
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false //关闭更新提示动画
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        // this.$toast('刷新成功')
      } catch (error) {
        this.refreshSuccessText = `刷新失败，请重新刷新`
        this.isLoading = false //关闭更新提示动画
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  //给列表数据设置高度 结局滚动数据固定位置问题
  height: 80vh;
  overflow-y: auto;
}
.van-list {
  padding-bottom: 100px;
}
</style>