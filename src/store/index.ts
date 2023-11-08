import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/store/modules/login'

const store = createPinia()

export const registerStore = (app: App<Element>) => {
  // 1.use的pinia
  app.use(store)
  // 2.加载本地的数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default store
