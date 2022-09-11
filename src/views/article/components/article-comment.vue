<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败,请点击重试"
      @load="onLoad"
      :immediate-check="true"
    >
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @replay-click="$emit('replay-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  props: {
    sourceId: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数居条数
      limit: 12,
      error: false
    }
  },
  created() {
    // 进入开启loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.sourceId.toString(), //源id，文章id或评论id
          offset: this.offset,
          limit: this.limit
        })

        // 2. 将数据添加到列表
        const { results } = data.data

        this.list.push(...results)
        // 传递评论总数
        this.$emit('total_success', data.data)
        // 3. 将loading设置未false
        this.loading = false
        // 4. 判断是否还有数据  有就更新下一页数据页码 没有就将finished设置为结束
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('稍后重试!')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>