import type pageContent from '@/components/page-content/index.vue'
export function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof pageContent> | null>(null)
  // search的查询方法
  const handleQuery = (searchData: any) => {
    console.log(searchData, pageContentRef.value, 'searchData')
    pageContentRef.value?.queryDataList(searchData)
  }
  // search的重置方法 - 重置pagination和tableList
  const handleRest = () => {
    pageContentRef.value?.resetDataList()
  }
  return {
    pageContentRef,
    handleQuery,
    handleRest
  }
}
