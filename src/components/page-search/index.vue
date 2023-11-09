<template>
  <div class="search bg-white px-20 py-10 rounded-xl">
    <el-form :model="searchFormData" ref="searchFormRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input
                  v-model="searchFormData[item.prop as string]"
                  :placeholder="item.placeholder"
                  clearable
                ></el-input>
              </el-form-item>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker
                  v-model="searchFormData[item.prop as string]"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
      <div class="search-btns flex items-center justify-end">
        <el-button icon="i-ep-refresh-right" @click="resetClick">重置 </el-button>
        <el-button type="primary" icon="i-ep-search" @click="searchCLick">搜索 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { searchConfigType } from '@/types/config/search.config'

interface Prop {
  searchConfig: searchConfigType
}
const props = defineProps<Prop>()
const emits = defineEmits(['reset', 'search'])
const initialFormData: any = {}
for (const item of props.searchConfig.formItems) {
  initialFormData[item.prop as string] = item.initialValue ?? void 0
}
const searchFormData = reactive(initialFormData)

// 重置和搜索
const searchFormRef = ref()
const resetClick = () => {
  searchFormRef.value?.resetFields()
  emits('reset')
}
const searchCLick = () => {
  emits('search', searchFormData)
}
</script>

<style lang="scss" scoped>
.search {
  .el-form-item {
    margin-bottom: 30px;
  }
}
</style>
