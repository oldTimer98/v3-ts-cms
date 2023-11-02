<template>
  <div class="app">
    <el-config-provider :locale="appStore.locale" :size="appStore.size">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
}
</style>
