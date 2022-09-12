<template>
  <div class="photo">
    <img class="img" :src="img" ref="imgUrl" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="confirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api/user'
export default {
  name: 'EditPhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.imgUrl
    this.cropper = new Cropper(image, {
      viewMode: 1, // 查看模式 限制裁剪框为画布的大小
      dragMode: 'move', // 拖动模式
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    // 确定按钮
    confirm() {
      // console.log(this.cropper.getData())
      try {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          // this.$toast.loading({
          //   message: '保存中...',
          //   forbidClick: true,
          //   duration: 0
          // })
          const formData = new FormData()
          formData.append('photo', blob)
          console.log(formData)

          editUserPhoto(formData).then((res) => {
            console.log(res.data.data.photo)
            // 关闭弹出层
            this.$emit('close')
            // 更新视图
            this.$emit('upDataPhoto', res.data.data.photo)
          })
        })
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>