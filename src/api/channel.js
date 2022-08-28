//  文章请求模块
import request from '@/utils/request'

// 获取全部频道列表
export const getAboutChannels = () => {
  return request({
    url: "v1_0/channels",
    method: "GET"
  })
}

// 批量修改添加用户频道
export const editChannels = (channel) => {
  return request({
    url: "v1_0/user/channels",
    method: "PATCH",
    data:{
      channels:[channel]
    }
  })
}

// 删除指定用户频道
export const deleteChannels = (channelId)=>{
  return request({
    url:`v1_0/user/channels/${channelId}`,
    method:"DELETE"
  })
}