import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  server:{
    proxy: {
      '/rootdata':{
        target: 'https://api.rootdata.com/open/ser_inv',
        changeOrigin: true,
        rewrite: (path)=>path.replace(/^\/rootdata/, '')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})
