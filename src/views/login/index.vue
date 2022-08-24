<template>
  <div class="login-containner">
    <!-- 头部标题 -->
    <van-nav-bar  title="登录" >
      <van-icon
      slot="left"
      name="arrow-left"
      @click="$router.back()"
       />
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            round
            size="small"
            type="primary"
            native-type="button"
            @click="sendCode"
            >发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" class="login-btn" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data () {
    return {
      // 绑定页面数据传递给后台
      user: {
        mobile: '',
        code: ''
      },
      // 验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 控制显示与隐藏
      isCountDownShow: false
    }
  },
  methods: {
    // 表单提交事件
    async onSubmit () {
      // 获取表单数据
      // 通过try。。。catch捕获 成功与失败的状态
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('editUser', data.data)
        this.$toast.success('登陆成功') // 成功提示
        // 登录成功跳转至我的页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误') // 失败的提示
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    // 点击发送验证码
    async sendCode () {
      // 1.验证手机号
      // 2.验证通过 显示倒计时
      // 3.请求发送验证码
      // e.preventDefault()
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return this.$toast.fail(error.message)
      }
      // 验证通过显示倒计时
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast.fail('验证码发送频繁，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-containner {
  .iconfont {
    font-size: 47px;
  }
  .send-btn {
    line-height: 36px;
    color: #666666;
    background-color: #ededed;
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
