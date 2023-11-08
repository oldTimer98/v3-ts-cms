import { createApp } from 'vue'
import { registerIcons } from '@/global/register-icons'
// 国际化
import i18n from '@/lang/index'
import router from '@/router'
import { registerStore } from '@/store'
import App from './App.vue'
import 'normalize.css'
import '@unocss/reset/tailwind.css' //初始化css
import '@/assets/css/index.scss'
import 'uno.css' //引入unocss

const app = createApp(App)
// 注册store
registerStore(app)
// 注册icons
registerIcons(app)
app.use(i18n)
app.use(router)
app.mount('#app')
