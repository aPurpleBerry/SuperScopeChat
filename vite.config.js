import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  server:{
    proxy: {
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
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})
