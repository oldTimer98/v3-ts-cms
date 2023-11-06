<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon>
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
const isFold = ref(false)
// 点击收起事件
const emits = defineEmits(['foldChange'])
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
