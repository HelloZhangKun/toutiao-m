import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import '@/styles/index.less'
// 全局加载vant组件文件
import '@/plugins'
// 加载动态设置rem基准值
import 'amfe-flexible'
// 引入时间格式
import "@/utils/day.js"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
