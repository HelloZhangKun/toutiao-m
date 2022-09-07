import request from "@/utils/request"
// 获取文章评论列表
export function getComments(params) {
  return request({
    method: "GET",
    url: "v1_0/comments",
    params
  });
}

// 对评论点赞
export const likings = (target) => {
  return request({
    url: "v1_0/comment/likings",
    method: "POST",
    data: {
      target
    }
  })
}

// 取消对评论点赞
export const cancleLikings = (target) => {
  return request({
    url: `v1_0/comment/likings/${target}`,
    method: "DELETE",
  })
}

// 发布文章评论
export const addComment = (data) => {
  return request({
    url: `v1_0/comments`,
    method: "POST",
    data
  })
}