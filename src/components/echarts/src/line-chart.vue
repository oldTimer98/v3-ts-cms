<template>
  <div class="line-echart">
    <BaseChart :option="option" title="分类商品的销量" ref="echartRef" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
interface Prop {
  XData: string[]
  YData: number[]
}
const props = defineProps<Prop>()
const echartRef = ref()
const option = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.XData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.YData,
      type: 'line',
      areaStyle: {}
    }
  ]
}))
</script>

<style lang="scss" scoped></style>
