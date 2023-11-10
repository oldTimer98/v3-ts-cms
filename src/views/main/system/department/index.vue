<template>
  <div class="department">
    <page-search :search-config="searchConfig" @reset="handleRest" @search="handleQuery" />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @create="handleCreate"
      @edit="handleEdit"
    >
      <!-- name="createAt"----简写#createAt -->
      <template #parentId="scope">
        {{ handelParentID(scope.row.parentId) }}
      </template>
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="newModelConfig" />
  </div>
</template>

<script setup lang="ts" name="department">
import { useAddDept2Config } from '@/hooks/useAddDept2Config'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { useMainStore } from '@/store/modules/main'
import { formatUtcString } from '@/utils'
import { modalConfig } from '@/views/main/system/department/config/modal.config'
import { contentConfig } from './config/content.config'
import { searchConfig } from './config/search.config'
const { pageContentRef, handleQuery, handleRest } = usePageContent()
const { pageModalRef, handleCreate, handleEdit } = usePageModal()
const { newModelConfig } = useAddDept2Config(modalConfig)

// 处理上级部门回显
const handelParentID = (id: number) => {
  if (id) {
    const mainStore = useMainStore()
    let str = (mainStore.departmentList.find((i: any) => i.id === id) as any)?.name
    return str
  }
}
</script>

<style scoped lang="scss">
.department {
  .search {
    background-color: #fff;
    border-radius: 20px;
  }
  .count {
    background-color: #fff;
    border-radius: 20px;
    margin-top: 20px;
  }
}
</style>
