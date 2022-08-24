module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/app': {
        target: 'http://toutiao.itheima.net/',
        pathRewrite: { '^/app': '' },
        ws: true,
        changeOrigin: true
      },
     
    }
  }
}
