<template>
  <div class="gander">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @change="onChange"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api/user'
export default {
  name: 'EditGander',
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserInfo({
          gender: this.localGender
        })
        // 更改父组件状态
        this.$emit('input', this.localGender)
        // 发送关闭事件
        this.$emit('close')
        // 提示消息
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>