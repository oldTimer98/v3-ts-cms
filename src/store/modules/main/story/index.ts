import { defineStore } from 'pinia'
import { createNewStory, postStoryList } from '@/service/modules/main/story'
import type { CreateStoryData, StoryInfo } from '@/types/main/story'

interface Istate {
  pageSize: number
  count: number
  storyList: StoryInfo[]
}

export const useStoryStore = defineStore('story', {
  state: (): Istate => {
    return {
      pageSize: 0,
      count: 0,
      storyList: []
    }
  },
  actions: {
    async createNewStoryAction(data: CreateStoryData) {
      const res = await createNewStory(data)
      if (res.code == 0) {
        ElMessage.success(res.data)
      } else {
        ElMessage.error(res.data)
      }
    },
    async postStoryListAction() {
      const res = await postStoryList({
        offset: 0,
        size: this.pageSize
      })
      this.count = res.data?.totalCount
      this.storyList = res.data?.list
    }
  }
})
