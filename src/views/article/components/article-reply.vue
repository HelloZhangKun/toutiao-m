<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scoll">
      <!-- 当前评论项组件 -->
      <CommentItem :comment="comment" />

      <!-- 评论回复列表 -->
      <van-cell title="全部回复"> </van-cell>
      <ArticleCommtne :list="commentList" :sourceId="comment.com_id" type="c" />
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" @click="isReplay = true" round
        >写评论</van-button
      >
    </div>

    <van-popup v-model="isReplay" position="bottom">
      <CommentPop :articleId="comment.com_id" @post_success="obPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import ArticleCommtne from './article-comment.vue'
import CommentPop from './comment-pop.vue'
export default {
  name: 'ArticleReply',
  components: {
    CommentItem,
    ArticleCommtne,
    CommentPop
  },

  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      isReplay: false,
      commentList: []
    }
  },
  methods: {
    obPostSuccess(data) {
      console.log(data)
      this.comment.reply_count++
      this.isReplay = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000;
  }
}
.post-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
}
.post-btn {
  width: 60%;
}
.scoll {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>