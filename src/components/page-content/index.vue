<template>
  <div class="content bg-white p-5 mt-5 rounded-xl">
    <div class="content-header flex justify-between items-center">
      <div class="text-5 font-bold text-#D68A8A">{{ contentConfig.header.title }}</div>
      <el-button type="primary" size="large" class="!text-4">{{
        contentConfig.header.btnText
      }}</el-button>
    </div>
    <el-table class="content-table mt-2 w-full" border :data="dataList">
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
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                text
                @click="handleDelete(scope.row.id)"
              >
                删除
              </el-button>
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
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handlePageInfoChange"
      @current-change="handlePageInfoChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/modules/main'
import type { contentConfigType } from '@/types/config/content.config'
interface Prop {
  contentConfig: contentConfigType
}
const props = defineProps<Prop>()
console.log(props)
const mainStore = useMainStore()
const { pageInfo, dataList } = storeToRefs(mainStore)

// 初始化请求数据
mainStore.queryDataList(props.contentConfig.pageName)
// 翻页逻辑 合在一起了
const handlePageInfoChange = () => {
  mainStore.queryDataList(props.contentConfig.pageName)
}
const handleEdit = (row: any) => {
  console.log(row)
}
const handleDelete = (id: number) => {
  console.log(id)
}
</script>

<style lang="scss" scoped>
.content {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}
</style>
