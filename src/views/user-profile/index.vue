<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      @click-left="$router.back()"
      left-arrow
      class="page-nav-bar"
    />
    <!-- 选择文件进行上传更改头像 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell-group>
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="updataName = true"
      />
      <van-cell
        title="性别"
        :value="userInfo.gender ? '女' : '男'"
        is-link
        @click="ganderShow = true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="birthdayShow = true"
      />
    </van-cell-group>

    <!-- 编辑昵称 -->
    <van-popup v-model="updataName" position="bottom" style="height: 100%">
      <EditName
        v-if="updataName"
        v-model="userInfo.name"
        @cancleName="updataName = false"
      />
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="ganderShow" position="bottom">
      <EditGander
        v-if="ganderShow"
        v-model="userInfo.gender"
        @close="ganderShow = false"
      />
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup v-model="birthdayShow" position="bottom">
      <EditBirthday
        v-model="userInfo.birthday"
        @close="birthdayShow = false"
        v-if="birthdayShow"
      />
    </van-popup>

    <!-- 编辑头像 -->
    <van-popup v-model="photoShow" position="bottom" style="height: 100%">
      <EditPhoto
        :img="img"
        @close="photoShow = false"
        @upDataPhoto="userInfo.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/editName.vue'
import EditGander from './components/editGander.vue'
import EditBirthday from './components/editBirthday.vue'
import EditPhoto from './components/editPhoto.vue'
export default {
  name: 'UserProfile',
  components: {
    EditName,
    EditGander,
    EditBirthday,
    EditPhoto
  },
  data() {
    return {
      userInfo: {}, //个人用户信息
      updataName: false,
      ganderShow: false,
      birthdayShow: false,
      photoShow: false,
      img: null //预览图片
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
    },
    // 修改头像
    onFileChange() {
      // 获取文件对象 修改头像
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob对象
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片
      this.photoShow = true
      // 需要把input-file的value清空 否则不会展示
      this.$refs.file.value = ''
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