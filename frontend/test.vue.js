// frontend/vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map' // 启用source map便于调试
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}