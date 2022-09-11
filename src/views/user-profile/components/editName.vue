<template>
  <div class="editName">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancleName')"
      @click-right="updataConfirm"
    />

    <!-- 修改名称输入框 -->
    <div class="field">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserInfo } from '@/api/user'
export default {
  name: 'EditName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async updataConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: 'true',
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await editUserInfo({
          name: this.localName
        })
        this.$emit('input', localName)
        this.$emit('cancleName')
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast('修改失败,请重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000;
  }
}
.field {
  padding: 20px;
}
</style>