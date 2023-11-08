import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/store/modules/theme'
export default function useLocale() {
  const i18n = useI18n()
  const themeStore = useThemeStore()
  const currentLocale = computed(() => {
    return i18n.locale.value
  })
  const changeLocale = (value: string) => {
    i18n.locale.value = value
    themeStore.locale = value
    ElMessage.success(i18n.t('root.success'))
  }
  return {
    currentLocale,
    changeLocale
  }
}
