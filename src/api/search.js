import request from '@/utils/request'
// 获取搜索联想词
export const getSuggestion = (data) => {
  return request({
    url: `v1_0/suggestion?q=${data}`,
    method: "GET"

  })
}

// 获取搜索结果
export const getResult = (params)=>{
  return request({
    url:"v1_0/search",
    method:"GET",
    params
  })
}