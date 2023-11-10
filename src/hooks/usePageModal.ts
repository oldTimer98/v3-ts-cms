import type pageModal from '@/components/page-modal/index.vue'
type CreateCallBack = (data?: any) => void
type EditCallBack = (data?: any) => void
export function usePageModal(createCallBack?: CreateCallBack, editCallBack?: EditCallBack) {
  const pageModalRef = ref<InstanceType<typeof pageModal> | null>(null)

  const handleCreate = () => {
    createCallBack && createCallBack()
    pageModalRef.value?.setDialogFormVisible()
  }
  const handleEdit = (row: any) => {
    editCallBack && editCallBack(row)
    pageModalRef.value?.setDialogFormVisible(false, row)
  }
  return {
    pageModalRef,
    handleCreate,
    handleEdit
  }
}
