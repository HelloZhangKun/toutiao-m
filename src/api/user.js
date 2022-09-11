// 用户相关请求
import request from '@/utils/request'
// import store from '@/store'
// const token = JSON.parse(store.state.user) // 对token进行转换
// 登录请求
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendSms = mobile => {
  return request({
    url: `v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    url: 'v1_0/user',
    method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${token.token}` // 传入用户token
    // }
  })
}
// 获取用户频道列表
export const channelList = () => {
  return request({
    url: "v1_0/user/channels",
    method: "GET"
  })
}

// 关注用户
export const addFollowings = (target) => {
  return request({
    url: "v1_0/user/followings",
    method: "POST",
    data: {
      target
    }
  })
}

// 取消关注用户
export const cancelFollowings = (target) => {
  return request({
    url: `v1_0/user/followings/${target}`,
    method: "DELETE",

  })
}

// 获取用户个人信息
export const getUserProfile = () => {
  return request({
    url: `v1_0/user/profile`,
    method: "GET",
  })
}

// 编辑用户个人信息
export const editUserInfo = (data) => {
  return request({
    url: `v1_0/user/profile`,
    method: "PATCH",
    data
  })
}


