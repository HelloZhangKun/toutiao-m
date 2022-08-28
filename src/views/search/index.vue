<template>
  <div class="search-containner">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @input="changeIpt"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult
      :searchText="searchText"
      v-if="isResultShow"
      @search="onSearch"
    />
    <!-- 搜索联想词 -->
    <SearchAdvice v-else-if="searchText" :searchText="searchText" />
    <!-- 历史记录 -->
    <SearchHistory
      @allDelete="searchHistory = []"
      :searchHistory="searchHistory"
      @search="onSearch"
      v-else
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchAdvice from './components/search-advice.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchAdvice,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, //控制搜索结果的展示
      searchHistory: getItem('TOUTIAO_HISTORY') || [] //搜索历史记录
    }
  },
  watch: {
    searchHistory(val) {
      // console.log(1111)
      setItem('TOUTIAO_HISTORY', val)
    }
  },
  methods: {
    onSearch(val) {
      // 点击enter键触发搜索
      this.searchText = val
      // 查找数组中谁否存在重复
      const index = this.searchHistory.indexOf(val)
      // 如果有重复那么就删除
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 从前面添加新元素
      this.searchHistory.unshift(val)

      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    // 监测搜索框的搜索内容
    changeIpt(e) {
      // console.log(e);
      if (e.length === 0) {
        this.isResultShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-containner {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>