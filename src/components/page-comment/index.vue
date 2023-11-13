<template>
  <div class="bg-white p-8 rounded-2xl shadow-xl">
    <div class="flex items-center h-16">
      <div>
        <el-avatar :size="40">
          <i-ep-userFilled />
        </el-avatar>
      </div>
      <div class="w-full ml-4 flex justify-between">
        <div class="text-black border border-b-2 border-gray px-8 py-2">{{ comment.title }}</div>
        <div class="text-gray">{{ formatTime(comment.createAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="pageComment">
import type { StoryInfo } from '@/types/main/story'
import { formatTime } from '@/utils'
interface Prop {
  comment: StoryInfo
}
defineProps<Prop>()
</script>

<style lang="scss" scoped></style>
