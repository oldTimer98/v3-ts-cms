<template>
  <div class="department">
    <page-search :search-config="searchConfig" @reset="handleRest" @search="handleQuery" />
    <page-content ref="pageContentRef" :content-config="contentConfig" @create="handleCreate">
      <!-- name="createAt"----简写#createAt -->
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfig" />
  </div>
</template>

<script setup lang="ts" name="department">
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { formatUtcString } from '@/utils'
import { modalConfig } from '@/views/main/system/department/config/modal.config'
import { contentConfig } from './config/content.config'
import { searchConfig } from './config/search.config'
const { handleQuery, handleRest, pageContentRef } = usePageContent()
const { pageModalRef, handleCreate } = usePageModal()
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
