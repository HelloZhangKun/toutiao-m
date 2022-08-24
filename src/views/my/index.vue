<template>
  <div class="my-containner">
    <!-- 已登录状态 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="edit-info" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 点击跳转登录页 未登录 -->
    <div class="header not-login" v-else>
      <router-link to="/login" class="login-btn">
        <img class="mobile" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </router-link>
    </div>
    <!-- 收藏/历史 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知/小智同学 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="md9" />
      <van-cell
        title="退出登录"
        clickable
        @click="loginOut"
        v-if="user"
        class="cell-logout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      // 获取用户自己信息
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    loginOut () {
      // 退出登录
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // 确认退出删除本地token
          // 调用vuex中的方法并对state赋值为null
          this.$store.commit('editUser', null)
        })
        .catch(() => {})
    },
    // 获取用户自己信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户数据失败，稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-containner {
  .header {
    height: 361px;
    // background-color: pink;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .mobile {
      width: 132px;
      height: 132px;
    }
    .text {
      font-size: 28px;
      color: #fff;
      margin-top: 15px;
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: solid 4px #ffffff;
        }
        .name {
          color: #fff;
          margin-left: 22px;
          font-size: 30px;
        }
      }
      .right {
        width: 116px;
        height: 33px;
        display: flex;
        .edit-info {
          font-size: 20px;
          color: #666;
        }
      }
    }
    .data-stats {
      height: 130px;
      // background: ;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
          margin-bottom: 20px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
        color: #333;
        margin-top: 16px;
      }
    }
  }

  .cell-logout {
    text-align: center;
    font-size: 30px;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>
