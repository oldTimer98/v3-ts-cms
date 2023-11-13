<template>
  <div class="dashboard">
    <div class="w-full">
      <el-row :gutter="10">
        <template v-for="(item, index) in analysisStore.goodsAmountList" :key="index">
          <el-col :span="6">
            <page-panel :goods-amount="item" />
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="echarts mt-4">
      <el-row :gutter="10">
        <el-col :span="8"><pie-chart :pie-data="goodsCategoryCount" /></el-col>
        <el-col :span="8"><map-chart :map-data="goodsAddressSaleComputed" /></el-col>
        <el-col :span="8"><rose-chart :rose-data="goodsCategoryCount" /></el-col>
        <el-col :span="12"
          ><line-chart :XData="goodsCategorySale.X" :YData="goodsCategorySale.Y" class="mt-4"
        /></el-col>
        <el-col :span="12"
          ><bar-chart :XData="goodsCategorySale.X" :YData="goodsCategorySale.Y" class="mt-4"
        /></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { useAnalysisStore } from '@/store/modules/main/analysis'

// 初始化数据
const analysisStore = useAnalysisStore()
analysisStore.getDashBoardDataAction()
const goodsAddressSaleComputed = computed(() => {
  return analysisStore.goodAddressSale.map((item) => {
    return {
      value: item.count,
      name: item.address
    }
  })
})

const goodsCategoryCount = computed(() => {
  return analysisStore.goodsCategoryCount.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const goodsCategorySale = computed(() => {
  const X = analysisStore.goodsCategorySale.map((item) => item.name)
  const Y = analysisStore.goodsCategorySale.map((item) => item.goodsCount)
  return { X, Y }
})
</script>

<style lang="scss" scoped>
.dashboard {
  color: red;
}
</style>
