<template>
  <div class="chat">
    <div class="chat-title">
      <el-form :model="form" size="large">
        <el-form-item label="标题:">
          <el-input v-model="form.title" />
        </el-form-item>
      </el-form>
    </div>
    <page-editor v-model="editorHtml" />
    <div class="search-btns flex items-center justify-end mt-5 mr-5">
      <el-button class="!text-4" @click="refreshEditor">
        <template #icon>
          <i-ep-refresh />
        </template>
        刷新
      </el-button>
      <el-button type="primary" class="!text-4" @click="submitEditor">
        <template #icon>
          <i-ep-search />
        </template>
        提交
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="chat">
import { useStoryStore } from '@/store/modules/main/story'

const form = reactive({
  title: ''
})
const editorHtml = ref<string>()

const refreshEditor = () => {
  editorHtml.value = ''
}

// 保存数据
const storyStore = useStoryStore()
const submitEditor = async () => {
  await storyStore.createNewStoryAction({
    title: form.title,
    content: editorHtml.value!
  })
  form.title = ''
  editorHtml.value = ''
}
</script>

<style scoped></style>
