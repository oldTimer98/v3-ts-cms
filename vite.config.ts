import { fileURLToPath, URL } from 'node:url'

import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
//自动导入组件库样式文件---elementPlus现在是不需要用的
// import {
//   createStyleImportPlugin,
//   ElementPlusResolve
// } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  //获取到env，env获取定义变量
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json'
        },
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          IconsResolver()
        ],
        dts: path.resolve(pathSrc, 'types', 'components.d.ts') // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
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
    server: {
      port: 8080,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVER_PATH,
          changeOrigin: true,
          rewrite: (path: any) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    }
  }
})
