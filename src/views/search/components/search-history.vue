<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史">
        <span v-if="isShowDelete">
          <span class="padd20" @click="$emit('allDelete')">全部删除</span>
          <span @click="isShowDelete = false">完成</span>
        </span>
        <van-icon name="delete-o" v-else @click="isShowDelete = true" />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="onSearchItem(index, item)"
      >
        <van-icon name="close" v-show="isShowDelete" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isShowDelete: false
    }
  },
  methods: {
    onSearchItem(index, item) {
      if (this.isShowDelete) {
        // 删除状态,删除历史记录
        this.searchHistory.splice(index, 1)
      } else {
        // 非删除状态  直接进入搜索 发射事件 从父组件中调用搜索方法
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .padd20 {
    padding-right: 20px;
  }
}
</style>