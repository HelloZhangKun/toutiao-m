<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      @click-left="$router.back()"
      left-arrow
      class="page-nav-bar"
    />

    <!-- 个人信息 -->
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="updataName = true"
      />
      <van-cell title="性别" :value="userInfo.gender ? '女' : '男'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>

    <!-- 编辑昵称 -->
    <van-popup v-model="updataName" position="bottom" style="height: 100%">
      <EditName
        v-if="updataName"
        v-model="userInfo.name"
        @cancleName="updataName = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/editName.vue'

export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  data() {
    return {
      userInfo: {}, //个人用户信息
      updataName: false
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    // 获取用户个人信息
    async getUserinfo() {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
      } catch (error) {
        this.$toast(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__arrow {
  color: #fff;
}
.avatar {
  width: 60px;
  height: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>