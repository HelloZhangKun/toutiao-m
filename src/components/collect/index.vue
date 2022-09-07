<template>
  <van-icon
    :class="{ collectIcon: value }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collections, collectionsDelete } from '@/api/article'
export default {
  name: 'Collect',
  props: {
    value: {
      type: Boolean,
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
    // 添加收藏接口
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已经收藏 进行取消操作
          await collectionsDelete(this.articleId)
        } else {
          // 为收藏 进行收藏操作
          await collections(this.articleId)
        }
        // 更新视图 发送自定义事件
        this.$emit('input', !this.value)
        // 提示是否成功
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败,请稍后重试!')
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collectIcon {
  color: #ffa500;
}
</style>