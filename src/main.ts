import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.scss'

import router from '@/router'
import store from '@/store'

// 国际化
import i18n from '@/lang/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(i18n)
app.mount('#app')
