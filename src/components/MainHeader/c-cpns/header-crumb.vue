<template>
  <div class="crumb">
    <el-breadcrumb>
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/modules/login'
import { mapPathToBreadcrumbs, type IBreadcrumbs } from '@/utils'
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs: Ref<IBreadcrumbs[]> = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="scss" scoped>
.crumb {
  color: red;
}
</style>
