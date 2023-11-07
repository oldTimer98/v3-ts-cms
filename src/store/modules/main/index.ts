import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: (): Istate => {
    return {
      list: [],
      totalCount: 0,
      searchState: -1,
      pagelist: [],
      pagetotalCount: 0
    }
  },
  actions: {}
})
