//  文章请求模块
import request from '@/utils/request'

// 获取文章列表数据
export const getArticle = (params) => {
  return request({
    url: "v1_0/articles",
    method: "GET",
    params
  })
}
// 获取新闻文章详情
export const getNewsDetailInfo = (article_id) => {
  return request({
    url: `v1_0/articles/${article_id}`,
    method: "GET"
  })
}

// 收藏文章
export const collections = (target) => {
  return request({
    url: `v1_0/article/collections`,
    method: "POST",
    data: {
      target
    }
  })
}

// 取消收藏文章
export const collectionsDelete = (target) => {
  return request({
    url: `v1_0/article/collections/${target}`,
    method: "DELETE"
  })
}

// 对文章点赞
export const likings = (target) => {
  return request({
    url: "v1_0/article/likings",
    method: "POST",
    data: {
      target
    }
  })
}

// 取消文章点赞
export const cancelLikings = (target) => {
  return request({
    url: `v1_0/article/likings/${target}`,
    method: "DELETE"

  })
}

