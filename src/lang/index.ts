import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import store from '@/store'
import { useThemeStore } from '@/store/modules/theme'
// 本地语言包
import enLocale from './package/en'
import zhCnLocale from './package/zh-cn'

const themeStore = useThemeStore(store)

function siphonI18n(prefix = 'zh-CN') {
  return Object.fromEntries(
    Object.entries(import.meta.glob('./**/*.ts', { eager: true })).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1]
      return [matched, value.default]
    })
  )[prefix]
}

const messages = {
  'zh-cn': {
    ...zhCnLocale,
    ...siphonI18n('zh-cn')
  },
  en: {
    ...enLocale,
    ...siphonI18n('en')
  }
}

const i18n = createI18n({
  legacy: false, // 如果想在composition api中使用需要设置为false
  locale: themeStore.locale,
  messages: messages as I18nOptions['messages'],
  globalInjection: true // 如果设置true, $t() 函数将注册到全局
})

export default i18n
