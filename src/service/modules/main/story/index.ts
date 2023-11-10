import Request from '@/service'
import type { CreateStoryData, StoryListData, StoryListParams } from '@/types/main/story'

export function createNewStory(data: CreateStoryData) {
  return Request.post({
    url: '/story',
    data
  })
}

export function postStoryList(data: StoryListParams) {
  return Request.post<StoryListData>({
    url: '/story/list',
    data
  })
}
