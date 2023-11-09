import type pageModal from '@/components/page-modal/index.vue'

export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof pageModal> | null>(null)

  const handleCreate = () => {
    pageModalRef.value?.setDialogFormVisible()
  }
  return {
    pageModalRef,
    handleCreate
  }
}
