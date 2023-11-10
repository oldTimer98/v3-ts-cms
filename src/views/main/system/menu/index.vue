<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @create="handleCreate"
      @edit="handleEdit"
    >
      <!-- name="createAt"----简写#createAt -->
      <template #icon="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon.split('-icon-')[1]"></component>
        </el-icon>
      </template>
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfig">
      <template #parentId>
        <el-tree-select
          v-model="otherInfo.parentId"
          :data="menuInfoComputed"
          check-strictly
          :render-after-expand="false"
          show-checkbox
          check-on-click-node
          class="w-full"
        ></el-tree-select>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="menu">
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { useMainStore } from '@/store/modules/main'
import { formatUtcString, mapMenuInfoToTree } from '@/utils/index'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
const { handleCreate, handleEdit, pageModalRef } = usePageModal(
  () => {
    otherInfo.parentId = ''
  },
  (info) => {
    otherInfo.parentId = info.parentId
  }
)
const { pageContentRef } = usePageContent()
// 处理下拉数据
const mainStore = useMainStore()
const menuInfoComputed = computed(() => {
  return mapMenuInfoToTree(mainStore.menuList)
})
const otherInfo = reactive({
  parentId: ''
})
</script>

<style scoped></style>
