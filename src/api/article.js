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
export const getNewsDetailInfo = (article_id)=>{
  return request({
    url:`v1_0/articles/${article_id}`,
    method:"GET"
  })
}

