import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.scss'

import router from '@/router/index.ts'

const app = createApp(App)
app.use(router)

app.mount('#app')
