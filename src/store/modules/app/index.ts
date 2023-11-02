import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      language: '',
      locale: 'zh-cn',
      size: 10,
      MY_SHOW_LOGIN_OAUTH: true //是否显示第三方授权登录
    }
  }
})
