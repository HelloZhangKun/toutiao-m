<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button
        class="reChannel"
        size="mini"
        type="danger"
        @click="edit = !edit"
        plain
        round
        >{{ edit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10" clickable>
      <van-grid-item
        class="my-grid-item"
        v-for="(item, index) in channels"
        :key="item.id"
        :text="item.name"
        @click="changeChannel(item, index)"
      >
        <van-icon
          v-show="edit && !fixedChannel.includes(item.id)"
          slot="icon"
          name="close"
        />
        <div class="text" :class="{ active: index === active }" slot="text">
          {{ item.name }}
        </div>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div class="title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" clickable direction="horizontal">
      <van-grid-item
        v-for="value in recommendChannel"
        icon="plus"
        :key="value.id"
        :text="value.name"
        @click="onAddChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAboutChannels,
  editChannels,
  deleteChannels
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number
    }
  },
  data() {
    return {
      channelsList: [],
      edit: false,
      fixedChannel: [0]
    }
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapState(['user']),
    // 处理推荐频道数据
    recommendChannel() {
      return this.channelsList.filter((item) => {
        return !this.channels.find((value) => {
          return value.id === item.id
        })
      })
    }
  },
  methods: {
    // 获取全部频道数据
    async getAll() {
      try {
        const { data } = await getAboutChannels()
        console.log(data)
        this.channelsList = data.data.channels
      } catch (error) {
        this.$toast('数据获取失败')
        console.log(222)
      }
    },
    // 点击推荐添加到我的频道
    async onAddChannel(item) {
      this.channels.push(item)
      // 判断是否为登录状态
      if (this.user) {
        try {
          const res = await editChannels({
            id: item.id,
            seq: this.channels.length
          })
          console.log(res)
        } catch (error) {
          this.$toast('修改失败')
        }
      } else {
        // 如果没有登录那么就存储到本地
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    changeChannel(item, index) {
      if (this.edit) {
        // 如果是固定频道 则不删除
        if (this.fixedChannel.includes(index)) {
          return
        }
        // 为编辑状态 执行删除频道
        if (index <= this.active) {
          this.$emit('upDataActive', this.active - 1, true)
        }
        this.deleteChannel(item)
        this.channels.splice(index, 1)
      } else {
        // 向父组件发射事件更改子组件中的值
        this.$emit('upDataActive', index, false)
      }
    },
    async deleteChannel(item) {
      // 删除持久化的数据
      if (this.user) {
        //判断是否已登录
        try {
          await deleteChannels(item.id)
        } catch (error) {
          this.$toast('操作失败')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .van-cell__title {
    font-size: 32px;
    line-height: 70px;
  }
  .reChannel {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .van-grid-item__content {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
  }
  /deep/ .van-grid-item__text {
    font-size: 30px;
    // font-weight: ;
    color: #222222;
  }
  /deep/ .van-icon-plus {
    font-size: 28px;
  }
  /deep/ .van-grid-item__icon-wrapper {
    position: unset;
  }
  .my-grid {
    .my-grid-item {
      /deep/ .van-icon {
        position: absolute;
        right: -12px;
        top: -14px;
        font-size: 30px;
        color: red;
      }

      .text {
        margin-top: 0;
        font-size: 28px;
      }
      // 动态添加类名
      .active {
        color: red;
      }
    }
    /deep/ .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>