<template>
  <div>
    <van-icon
      :class="{ liked: value === 1 }"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :loading="loading"
      @click="onLikings"
    />
  </div>
</template>

<script>
import { likings, cancelLikings } from '@/api/article'
export default {
  name: 'LickArticle',
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLikings() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞 取消点赞
          await cancelLikings(this.articleId)
        } else {
          // 未点赞 添加点赞
          await likings(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失败,请重试!')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: #ffa500;
}
</style>