<template>
  <div class="role">
    <page-search :search-config="searchConfig" @reset="handleRest" @search="handleQuery" />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @create="handleCreate"
      @edit="handleEdit"
    >
      <!-- name="createAt"----简写#createAt -->
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfig" :otherInfo="menuListCheckedId">
      <template #menuList>
        <el-tree
          :data="menuListComputed"
          show-checkbox
          node-key="id"
          ref="elTreeRef"
          :props="{
            children: 'children',
            label: 'name'
          }"
          highlight-current
          @check="handleCheckClick"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="menu">
import type { ElTree } from 'element-plus'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { useMainStore } from '@/store/modules/main'
import { formatUtcString, mapMenuChecked, mapMenuInfoToTree } from '@/utils/index'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { searchConfig } from './config/search.config'
const { handleCreate, handleEdit, pageModalRef } = usePageModal(
  () => {
    elTreeRef.value?.setCheckedKeys([])
  },
  (info) => {
    const checkedId = mapMenuChecked(info.menuList)
    elTreeRef.value?.setCheckedKeys(checkedId)
  }
)
const { pageContentRef, handleQuery, handleRest } = usePageContent()
// 处理下拉数据
const mainStore = useMainStore()
const menuListComputed = computed(() => {
  return mapMenuInfoToTree(mainStore.menuList)
})
const elTreeRef = ref<InstanceType<typeof ElTree>>()
// 点击菜单树
const menuListCheckedId = ref()
const handleCheckClick = (data1: any, data2: any) => {
  let menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  menuListCheckedId.value = { menuList }
}
</script>

<style scoped></style>
