export interface CreateStoryData {
  title: string
  content: string
}

export interface StoryListParams {
  offset: number
  size: number
}

export interface StoryListData {
  code: number
  data: StoryList
}

export interface StoryList {
  list: StoryInfo[]
  totalCount: number
}

export interface StoryInfo {
  id: number
  title: string
  content: string
  createAt: Date
}
