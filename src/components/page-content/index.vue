<template>
  <div class="content bg-white p-5 mt-5 rounded-xl">
    <div class="content-header flex justify-between items-center">
      <div class="text-5 font-bold text-#D68A8A">{{ contentConfig.header.title }}</div>
      <el-button type="primary" size="large" class="!text-4" @click="createClick">{{
        contentConfig.header.btnText
      }}</el-button>
    </div>
    <el-table
      class="content-table mt-2 w-full"
      border
      :data="dataList"
      :row-key="contentConfig.table?.rowKey"
      :tree-props="contentConfig.table?.treeProps"
      lazy
    >
      <template v-for="item in contentConfig.propsList" :key="item.prop">
        <template v-if="item.type === 'selection'">
          <el-table-column v-bind="item" />
        </template>
        <template v-else-if="item.type === 'index'">
          <el-table-column v-bind="item" />
        </template>
        <template v-else-if="item.type === 'operation'">
          <el-table-column v-bind="item">
            <template #default="scope">
              <el-button link icon="i-ep-edit" type="warning" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-popconfirm title="您确定删除吗?" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                  <el-button type="danger" link icon="i-ep-delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column v-bind="item" show-overflow-tooltip>
            <template #default="scope">
              <!-- slot里的数据是默认内容 -->
              <slot :name="item.slotName" v-bind="scope">
                {{ scope.row[item.prop as string] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <el-pagination
      class="mt-4 flex justify-end"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo?.total"
      @size-change="handlePageInfoChange"
      @current-change="handlePageInfoChange"
    />
  </div>
</template>

<script setup lang="ts" name="pageContent">
import { useMainStore } from '@/store/modules/main'
import type { contentConfigType } from '@/types/config/content.config'
interface Prop {
  contentConfig: contentConfigType
}
const props = defineProps<Prop>()
const emits = defineEmits(['create', 'edit'])
const mainStore = useMainStore()
const { pageInfo, dataList } = storeToRefs(mainStore)

// 初始化请求数据
mainStore.queryDataList(props.contentConfig.pageName)
// 翻页逻辑 合在一起了
const handlePageInfoChange = () => {
  mainStore.queryDataList(props.contentConfig.pageName)
}
// 新增方法
const createClick = () => {
  emits('create')
}
// 编辑方法
const handleEdit = (row: any) => {
  emits('edit', row)
}
// 删除方法
const handleDelete = (id: number) => {
  mainStore.deleteDataList(props.contentConfig.pageName, id)
}
// 导出的查询方法
const queryDataList = (data?: any) => {
  mainStore.queryDataList(props.contentConfig.pageName, data)
}
// 导出的重置方法
const resetDataList = () => {
  mainStore.resetPagination()
  queryDataList()
}
defineExpose({
  queryDataList,
  resetDataList
})
</script>

<style lang="scss" scoped>
.content {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}
</style>
