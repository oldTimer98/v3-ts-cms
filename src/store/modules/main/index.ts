import { defineStore } from 'pinia'
import { deletePagelist, getPagelist } from '@/service/modules/main'
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
    },
    // 重置pagination
    resetPagination() {
      this.pageInfo = {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    // 删除方法
    async deleteDataList(pageName: string, id: number) {
      const res = await deletePagelist(pageName, id)
      this.showMessage(res)
      this.queryDataList(pageName)
    },

    showMessage(res: any) {
      if (res.code === 0) {
        ElMessage.success(res.data)
      } else {
        ElMessage.error(res.data)
      }
    }
  }
})
