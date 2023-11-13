<template>
  <div class="rose-echart">
    <BaseChart :option="option" title="分类商品数量(玫瑰图)" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import type { ChartValueType } from '../types'
interface Prop {
  roseData: ChartValueType[]
}

const props = defineProps<Prop>()
const option = computed<EChartsOption>(() => ({
  color: ['#edc523', '#2ac9cf', '#f87777', '#67a4fc', '#6dcc50'],
  legend: {
    orient: 'horizontal',
    top: 20
  },
  tooltip: {
    backgroundColor: '#333',
    textStyle: {
      color: '#eee'
    },
    formatter: '{b} : {c}（{d}%）' // a->seriesName,b->legendName,c->value,d->percent
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      clockwise: false,
      radius: '50%',
      hoverAnimation: false,
      roseType: 'radius',
      center: ['50%', '60%'],
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 5
        },
        borderRadius: 14
      },
      data: props.roseData
    }
  ]
}))
</script>
