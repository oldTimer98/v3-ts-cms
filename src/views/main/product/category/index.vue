<template>
  <div class="category">
    <page-search :search-config="searchConfig" @reset="handleRest" @search="handleQuery" />
    <page-content
      :content-config="tableConfig"
      ref="pageContentRef"
      @edit="handleEdit"
      @create="handleCreate"
    >
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

<script setup lang="ts" name="category">
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { formatUtcString } from '@/utils'
import { tableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { searchConfig } from './config/search.config'
const { pageContentRef, handleRest, handleQuery } = usePageContent()
const { pageModalRef, handleCreate, handleEdit } = usePageModal()
</script>
