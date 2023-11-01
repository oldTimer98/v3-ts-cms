import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/variables.scss";`
      }
    }
  }
})
