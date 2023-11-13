<template>
  <div class="list" v-infinite-scroll="loadMoreStory">
    <template v-for="item in storyStore.storyList" :key="item.id">
      <page-comment :comment="item" class="list-comment" />
    </template>
  </div>
</template>

<script setup lang="ts" name="list">
import { useStoryStore } from '@/store/modules/main/story'

const storyStore = useStoryStore()
storyStore.postStoryListAction()
const loadMoreStory = () => {
  storyStore.pageSize = storyStore.pageSize + 1
  storyStore.postStoryListAction()
}
</script>

<style scoped lang="scss">
.list {
  .list-comment {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}
</style>
