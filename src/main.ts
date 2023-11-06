import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.scss'

import router from '@/router'
import store from '@/store'

// 国际化
import i18n from '@/lang/index'
import { registerIcons } from '@/global/register-icons'

const app = createApp(App)
app.use(router)
app.use(store)
// 注册icons
registerIcons(app)
app.use(i18n)
app.mount('#app')
