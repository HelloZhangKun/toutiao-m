<template>
  <div class="birthdayShow">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'EditBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value) //初始化
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserInfo({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>