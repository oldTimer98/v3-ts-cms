import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
const pathSrc = path.resolve(__dirname, 'src')
// 自动导入插件
//自动导入组件库样式文件---elementPlus现在是不需要用的
// import {
//   createStyleImportPlugin,
//   ElementPlusResolve
// } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
// 使用unocss
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
//自动导入图标
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
//gzip
import VitePluginCompression from 'vite-plugin-compression'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { presetIcons } from 'unocss'
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      // 自动导入vueuse 以及pinia的storeToRefs
      imports: ['vue', 'vue-router', { pinia: ['storeToRefs'] }, '@vueuse/core'],
      resolvers: [
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json'
      },
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        //默认前缀为i，可自定义前缀
        IconsResolver({
          enabledCollections: ['ep']
          // prefix: 'icon'
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'types', 'components.d.ts') // 指定自动导入组件TS类型声明文件路径
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    /** 针对ElMessage和ElLoading等组件引入样式 */
    // createStyleImportPlugin({
    //   resolves: [ElementPlusResolve()],
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name: string) => {
    //         return `element-plus/theme-chalk/${name}.css`
    //       }
    //     }
    //   ]
    // })
    Unocss({
      presets: [
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      // 以下配置是为了可以直接使用标签 <i-ep-edit />
      variants: [
        {
          match: (s) => {
            if (s.startsWith('i-')) {
              return {
                matcher: s,
                selector: (s) => {
                  return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                }
              }
            }
          }
        }
      ]
    }),
    // Gzip
    VitePluginCompression()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "./src/assets/css/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: 'index.html',
      output: {
        // 静态资源打包做处理
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
    terserOptions: {
      // 清除console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 关闭生成map文件 可以达到缩小打包体积
    sourcemap: false,
    // 关闭文件计算
    reportCompressedSize: false
  },
  server: {
    open: false,
    hmr: true,
    host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址
    port: 9003,
    proxy: {
      '/api': {
        target: 'http://codercba.com:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
