<template>
  <div class="bg-white p-4 shadow-lg">
    <div class="h-8 border-b">{{ title }}</div>
    <div
      ref="echartRef"
      class="echarts-container w-full flex justify-center h-fit rounded-xl"
    ></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import ChinaJSON from '../data/china.json'
import type { ECOption } from '../types/echart.d' //引入配置文件
// 初始化图表
let myChart: echarts.ECharts
const echartRef = ref<HTMLElement>()
const props = defineProps({
  width: {
    type: String
  },
  height: {
    type: String,
    default: '400px'
  },
  title: {
    type: String,
    default: ''
  },
  option: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
const init = (dom: HTMLElement) => {
  myChart = echarts.init(dom!, 'light', {
    height: props.height,
    width: props.width
  })
  myChart.setOption(props.option)
}
//注册地图
echarts.registerMap('china', ChinaJSON as any)
onMounted(() => {
  if (echartRef.value) {
    init(echartRef.value)
  }
  // 绘制图表
  watchEffect(() => {
    myChart.setOption(props.option)
  })
  //监听窗口大小进行缩放
  useEventListener(window, 'resize', () => {
    myChart.resize()
  })
})
onBeforeUnmount(() => {
  if (myChart) myChart.dispose() //销毁
})

// 获取实例
const getDom = () => {
  if (myChart) return myChart.getDom()
}
// 动态设置option
const setOption = (option: ECOption) => {
  if (myChart) myChart.setOption(option)
}
defineExpose({
  getDom,
  setOption
})
</script>

<style lang="scss" scoped></style>
