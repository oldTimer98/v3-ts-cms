import { defineStore } from 'pinia'
import { getPagelist } from '@/service/modules/main'
// 所有页面的公共操作
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dataList: []
    }
  },
  actions: {
    // 查询数据
    async queryDataList(pageName: string, data?: any) {
      const res = await getPagelist(pageName, {
        offset: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        ...data
      })
      this.dataList = res.data.list
      this.pageInfo.total = res.data.totalCount
    }
  }
})
