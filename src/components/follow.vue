<template>
  <van-button
    v-if="followed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollowings, cancelFollowings } from '@/api/user'
export default {
  name: 'Followed',
  props: {
    followed: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow() {
      // 关注接口
      this.followLoading = true

      try {
        if (this.followed) {
          // 表示已关注  取消关注
          const { data } = await cancelFollowings(this.userId)
          console.log(data)
        } else {
          // 表示没有关注 添加关注
          const { data } = await addFollowings(this.userId)
          console.log(data)
        }

        // 对关注状态进行取反
      this.$emit('upDate',!this.followed)
      } catch (error) {
        let message = '确认登录,请重试!'
        if (error.response && error.response.status === 400) {
          message = '用户不能自己关注自己!'
        }
        this.$toast(message)
      }
      // 关闭按钮loading动画
      this.followLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>