<template>
  <div class="Main">
    <h2>{{ count }}</h2>
    <h3>{{ finalCount }}</h3>
    <button @click="addClick">add</button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/modules/main'
import { storeToRefs } from 'pinia'
const mainStore = useMainStore()
const { count, finalCount } = storeToRefs(mainStore)
const addClick = () => {
  mainStore.addCount()
}
</script>

<style lang="scss" scoped>
.Main {
}
</style>
