import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      theme: 'light',
      locale: 'zh-cn'
    }
  }
})
