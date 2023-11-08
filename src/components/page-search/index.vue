<template>
  <div class="search bg-white px-20 py-10 rounded-xl">
    <el-form :model="searchFormData" ref="formItems"> </el-form>
  </div>
</template>

<script setup lang="ts">
const searchFormData = reactive({})
</script>

<style lang="scss" scoped></style>
