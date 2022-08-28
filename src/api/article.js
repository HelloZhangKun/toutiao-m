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

