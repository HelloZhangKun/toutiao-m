// 加载封装请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint' //引入第三方包

// JSONBig.parse() 把json格式的字符串转为javascript对象
// JSONBig.stringify 把javascript对象转换为JSON格式的字符串
const request = axios.create({
  baseURL: 'app', // 基础地址


  // transformResponse: [function (data) {
  //   // data是后端返回的原始数据 JSON格式字符串
  //   // 自定义后端返回的原始数据
  //   try {
  //     return JSONBig.parse(data)
  //   } catch (error) {
  //     return data
  //   }
  // }],
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
