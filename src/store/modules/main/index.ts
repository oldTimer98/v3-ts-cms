import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 0
    }
  },
  getters: {
    finalCount: (state) => state.count * 10
  },
  actions: {
    addCount() {
      console.log(import.meta.env)
      this.count += 1
    }
  }
})
