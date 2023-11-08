import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@unocss/reset/tailwind.css' //初始化css
import '@/assets/css/index.scss'
import 'uno.css' //引入unocss

import router from '@/router'

// 国际化
import i18n from '@/lang/index'
import { registerIcons } from '@/global/register-icons'
import { registerStore } from '@/store'

const app = createApp(App)
// 注册store
registerStore(app)
// 注册icons
registerIcons(app)
app.use(i18n)
app.use(router)
app.mount('#app')
