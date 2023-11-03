<template>
  <div class="app">
    <el-config-provider :locale="locale" :message="message">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
const themeStore = useThemeStore()
const locale = computed(() => (themeStore.locale === 'zh-cn' ? zhCn : en))
const message = reactive({ max: 3 })
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
}
</style>
