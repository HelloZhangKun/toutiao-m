<template>
  <div class="search-advice">
    <!-- 联想建议 -->
    <van-cell
      icon="search"
      v-for="(item, index) in adviceList"
      :key="index"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="highlight(item)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      adviceList: []
    }
  },
  watch: {
    // 监听输入框的变化
    searchText: {
      // 利用lodash进行防抖函数
      handler: debounce(function (newVal) {
        this.loadSuggestion(newVal)
        this.highlight()
      }, 300),
      immediate: true //该回调将会在侦听开始之后立即调用
    }
  },
  methods: {
    // 获取联想数据
    async loadSuggestion(newVal) {
      try {
        const { data } = await getSuggestion(newVal)
        console.log(data)
        this.adviceList = data.data.options
      } catch (error) {
        this.$toast('数据获取失败,请稍后重试')
      }
    },
    // 搜索字符高亮
    highlight(text) {
      const heightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, heightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-advice {
  /deep/ .active {
    color: red;
  }
}
</style>