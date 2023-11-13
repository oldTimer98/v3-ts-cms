<template>
  <div class="bar-echart">
    <BaseChart :option="option" title="分类商品的收藏" ref="echartRef" />
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
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: props.XData,
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: props.XData.length
  },
  series: [
    {
      realtimeSort: true,
      name: '商品',
      type: 'bar',
      data: props.YData,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 6000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
}))
</script>

<style lang="scss" scoped></style>
