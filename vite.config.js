import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  server:{
    // host: '0.0.0.0',
    // https: true,
    proxy: {
      '/binance':{
        target: 'https://api.binance.com',
        changeOrigin: true,
        // secure: true,  // 确保代理使用 HTTPS 请求
        // protocolRewrite: 'https',
        rewrite: (path) => path.replace(/^\/binance/, '')
      },
      '/rootdata':{
        target: 'https://api.rootdata.com/open/ser_inv',
        changeOrigin: true,
        rewrite: (path)=>path.replace(/^\/rootdata/, ''),
        secure: true  // 确保代理使用 HTTPS 请求
      },
      '/gecko':{
        target: 'https://api.coingecko.com/api/v3/simple/price',
        changeOrigin: true,
        // secure: false,  // 确保代理使用 HTTPS 请求
        // protocolRewrite: 'https',
        rewrite: (path) => path.replace(/^\/gecko/, '')
      },
      '/atguigu': {
        target: 'http://sph-api.atguigu.cn',
        changeOrigin: true,
        // secure: false,  // 确保代理使用 HTTPS 请求
        // protocolRewrite: 'https',
        rewrite: (path) => path.replace(/^\/atguigu/, '')
      },
      '/qianwen': {
        target: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qianwen/, '')
      }
    }
  },
  plugins: [
    vue(),
    // basicSsl()
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})
