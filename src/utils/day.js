import dayjs from "dayjs";
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from "vue";

// 默认语音为英文

dayjs.locale('zh-cn')  //全局使用

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)


// 过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// console.log(dayjs().to(dayjs('2022-08-23')));

// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
