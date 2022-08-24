// 加载封装请求模块
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'app' // 基础地址
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起经过这里
  // config 本次请求的配置对象  统一设置token
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 如果请求出错了会走此函数
  return Promise.reject(error)
})

// 响应拦截器
export default request
