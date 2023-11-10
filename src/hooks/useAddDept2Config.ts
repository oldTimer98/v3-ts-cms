import type { modalConfigType } from '@/types/config/modal.config'
import { useMainStore } from './../store/modules/main/index'
export function useAddDept2Config(modelConfig: modalConfigType) {
  const mainStore = useMainStore()

  const newModelConfig = computed(() => {
    const departments = mainStore.departmentList.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
    for (const item of modelConfig.formItems) {
      if (item.prop === 'parentId' || item.prop === 'departmentId') {
        item.options?.push(...departments)
      }
    }
    return modelConfig
  })

  return {
    newModelConfig
  }
}
