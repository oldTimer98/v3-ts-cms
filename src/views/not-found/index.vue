<template>
  <div class="not-found flex justify-center items-center">
    <div
      class="flex flex-col items-center px-20 py-12 border-gray-50 border-2 rounded-3xl shadow-2xl"
    >
      <div>
        <img :src="ErrorImg" alt="" />
      </div>
      <div class="text-4xl mt-6">糟糕，网页出现故障</div>
      <div class="text-2xl my-8 text-center">我们正在尝试解决您的遇到的错误，请重试</div>
      <div class="btn">
        <el-button round auto-insert-space @click="handleRefresh">刷新</el-button>
        <el-button round auto-insert-space type="primary" class="!ml-14" @click="handleBack"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorImg from '@/assets/img/error.jpg'
const router = useRouter()
const handleBack = () => {
  router.back()
}
const handleRefresh = () => {
  location.reload()
}
</script>

<style lang="scss" scoped>
.not-found {
  height: 100%;
  .btn {
    --el-font-size-base: 24px;
    .el-button {
      padding: 20px 40px;
    }
  }
}
</style>
