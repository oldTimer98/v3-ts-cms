<template>
  <div class="department">
    <page-search :search-config="searchConfig" @reset="reset" @search="search" />
    <page-content :content-config="contentConfig">
      <!-- name="createAt"----简写#createAt -->
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="department">
import { formatUtcString } from '@/utils'
import { contentConfig } from './config/content.config'
import { searchConfig } from './config/search.config'
const reset = () => {}
const search = (fromData: any) => {
  console.log(fromData)
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
