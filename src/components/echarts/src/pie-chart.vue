<template>
  <div class="pie-echart">
    <BaseChart :option="option" title="分类商品数量(饼图)" ref="echartRef" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import type { ChartValueType } from '../types'
interface Prop {
  pieData: ChartValueType[]
}
const props = defineProps<Prop>()
const echartRef = ref()
const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    top: 20
  },
  series: [
    {
      name: '分类商品数量',
      type: 'pie',
      center: ['50%', '60%'],
      radius: '50%',
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
</script>

<style lang="scss" scoped></style>
