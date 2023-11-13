<template>
  <div class="goods">
    <page-search :search-config="searchConfig" @reset="handleRest" @search="handleQuery" />
    <page-content
      :content-config="tableConfig"
      ref="pageContentRef"
      @edit="handleEdit"
      @create="handleCreate"
    >
      <!-- name="createAt"----简写#createAt -->
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ '￥' + scope.row.newPrice }}</span>
      </template>
      <template #status="scope">
        <el-button
          :type="scope.row.status == 1 ? 'success' : 'danger'"
          class="!w-full"
          size="small"
        >
          {{ scope.row.status == 1 ? '可用' : '下架' }}
        </el-button>
      </template>
      <template #imgUrl="scope">
        <el-image
          style="width: 75px; height: 75px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          :hide-on-click-modal="true"
          :z-index="999"
          :preview-teleported="true"
          fit="cover"
        />
      </template>
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

<script setup lang="ts" name="goods">
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { formatUtcString } from '@/utils'
import { tableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { searchConfig } from './config/search.config'
const { pageContentRef, handleRest, handleQuery } = usePageContent()
const { pageModalRef, handleCreate, handleEdit } = usePageModal()
</script>
