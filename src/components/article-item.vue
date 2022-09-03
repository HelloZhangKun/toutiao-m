<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell :to="`/article/${article.art_id}`">
        <div slot="title" class="title">
          {{ article.title }}
        </div>
        <!-- 如果有三张图片则在下方显示 -->
        <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-wrap">
            <div
              class="cover-item"
              v-for="(item, index) in article.cover.images"
              :key="index"
            >
              <van-image
                class="cover-img"
                slot="default"
                fit="cover"
                :src="item"
              />
            </div>
          </div>
          <div class="article-info">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <!-- 时间过滤器 relativeTime -->
            <span>{{ article.pubdate | relativeTime }}</span>
          </div>
        </div>
        <!-- 如果只有一张图则显示此组件 -->
        <van-image
          v-if="article.cover.type === 1"
          slot="default"
          fit="cover"
          :src="article.cover.images[0]"
          class="right-cover"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  namne: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // /deep/ .van-cell {
  //   display: flex;
  // }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
    margin-left: 25px;
  }
  .article-info span {
    font-size: 23px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>