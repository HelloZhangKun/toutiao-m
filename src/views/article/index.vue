<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="newsArticle.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ newsArticle.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="newsArticle.aut_photo"
          />
          <div slot="title" class="user-name">{{ newsArticle.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ newsArticle.pubdate | relativeTime }}
          </div>
          <!-- $event为事件参数
          
           -->
          <Follow
            :followed="newsArticle.is_followed"
            :userId="newsArticle.aut_id"
            class="follow-btn"
            @upDate="newsArticle.is_followed = $event"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="newsArticle.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论组件 -->
        <ArticleComment
          @total_success="totalCount = $event.total_count"
          :list="commentList"
          :sourceId="newsArticle.art_id"
          @replay-click="onReplayClick"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="release = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏组件 -->
          <Collect
            class="btn-item"
            v-model="newsArticle.is_collected"
            :articleId="newsArticle.art_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <!-- 点赞组件 -->
          <LickArticle
            v-model="newsArticle.attitude"
            :articleId="newsArticle.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="release" position="bottom">
          <CommentPop :articleId="newsArticle.art_id" @post_success="onPost" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getDetailInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复 -->
    <van-popup v-model="isReplay" position="bottom" style="height: 100%">
      <ArticleReply
        v-if="isReplay"
        :comment="currentComment"
        @close="isReplay = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getNewsDetailInfo } from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
// 关注
import Follow from '@/components/follow'
// 收藏
import Collect from '@/components/collect'
// 点赞
import LickArticle from '@/components/lick-article'
// 评论
import ArticleComment from './components/article-comment'
// 评论弹窗
import CommentPop from './components/comment-pop.vue'
// 评论弹窗组件
import ArticleReply from './components/article-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    Follow,
    Collect,
    LickArticle,
    ArticleComment,
    CommentPop,
    ArticleReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      newsArticle: {},
      loading: true, //加载中的loading状态
      status: 0, //失败的状态码
      totalCount: 0,
      release: false,
      commentList: [], //评论列表
      isReplay: false,
      currentComment: {} //当前点击回复的评论项
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDetailInfo()
  },
  methods: {
    // 调用详情接口
    async getDetailInfo() {
      this.loading = true
      try {
        const { data } = await getNewsDetailInfo(this.articleId)
        // if(Math.random() > 0.5) {
        //   JSON.parse('ksdfasda')
        // }
        this.newsArticle = data.data

        // 初始化图片点击预览
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImg()
        }, 0)

        // this.loading = false //请求成功关闭loading
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.status = 404
        }
        // this.loading = false //请求成功关闭loading
        this.$toast('获取数据失败')
      }
      this.loading = false //不论成功与失败都要关闭loading
    },
    previewImg() {
      const articleContent = this.$refs['article-content']
      const images = articleContent.querySelectorAll('img')
      const imgLink = []
      images.forEach((img, index) => {
        imgLink.push(img.src)
        img.onclick = () => {
          ImagePreview({
            imgLink,
            startPosition: index
          })
        }
      })
    },
    onPost(data) {
      this.release = false
      this.commentList.unshift(data.new_obj)
    },

    onReplayClick(event) {
      this.currentComment = event
      this.isReplay = true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
